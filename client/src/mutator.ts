import { get } from 'http';
import { example_regex, assertion_regex, quantified_assertion_regex } from './forge-utilities';
import { getPredicatesOnly, removeForgeComments, exampleToPred, getSigList, getPredList, findExampleByName , test_regex, getFailingTestName} from './forge-utilities';


// Raise when an assertion is student predicates on both sides.
export class BothPredsStudentError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BothPredsStudentError';
	}
}

function extractSubstring(text: string, startRow: number, startColumn: number, span: number): string {

	// 1 index to 0 index
	startRow -= 1;

	//TODO: Forge output has span incorrect
	span += 1;

	// Split the text into rows
	const rows = text.split("\n");

	// Validate if startRow and startColumn are within bounds
	if (startRow < 1 || startRow > rows.length) {
		throw new Error("Something went wrong while I was reading Forge output.");
	}
	if (startColumn > rows[startRow - 1].length + 1) {
		throw new Error("Something went wrong while I was reading Forge output.");
	}

	// Calculate the starting index
	let startIndex = rows.slice(0, startRow - 1).reduce((acc, currRow) => acc + currRow.length + 1, 0) + startColumn;

	// Extract and return the substring
	return text.substring(startIndex, startIndex + span);
}

export class Mutator {

	wheat: string;
	student_preds: string;
	student_tests: string;
	forge_output: string;
	test_file_name: string;
	mutant: string;
	source_text : string;

	constructor(wheat: string, student_tests: string, forge_output: string, test_file_name: string, source_text : string) {
		this.wheat = wheat;

		this.student_tests = removeForgeComments(student_tests);
		this.forge_output = forge_output;
		this.student_preds = getPredicatesOnly(this.student_tests);
		this.test_file_name = test_file_name;


		this.mutant = this.wheat + "\n" + this.student_preds + "\n";
		this.source_text = source_text;
	}



	// w : Current wheat, i : predicate to be constrained, s : predicate by which to constrain
	constrainPredicate(w: string, i: string, s: string, quantifer_prefix: string = ""): string {
		const i_inner = i + "_inner";
		// User believes that i => s (ie if i then s).
		// So constrict i to be { i AND s }
		let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
		let added_pred =
			`
			pred ${i} { 
				 ${quantifer_prefix}	${i_inner} and ${s}
			}
			`
		return w_wrapped + added_pred;
	}

	constrainPredicateByExclusion(w: string, i: string, s: string, quantifer_prefix: string = ""): string {
		const i_inner = i + "_inner";
		// User believes that ! s => i, even thought s => i.
		// So constrict i to be { i AND !s }
		let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
		let added_pred =
			`
			pred ${i} { 
				${quantifer_prefix} ${i_inner} and not ${s}
			}
			`
		return w_wrapped + added_pred;
	}

	easePredicate(w: string, i: string, s: string, quantifer_prefix: string = ""): string {
		const i_inner = i + "_inner";
		// User believes that s => i (ie if s then i)
		// So ease i to be { i or s }
		let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
		let added_pred =
			`
			pred ${i} { 
				${quantifer_prefix} ${i_inner} or ${s}
			}
			`
		return w_wrapped + added_pred;
	}



	isInstructorAuthored(pred: string): boolean {
		return new RegExp(`\\b${pred}\\b`).test(this.wheat);
	}


	mutateToAssertion(lhs_pred: string, rhs_pred: string, op: string, quantified_prefix: string = "") {

		const isLhsInstructorAuthored = this.isInstructorAuthored(lhs_pred);
		const isRhsInstructorAuthored = this.isInstructorAuthored(rhs_pred);


		if (isLhsInstructorAuthored && isRhsInstructorAuthored) {
			throw new Error("I cannot provide you with any more feedback, since both predicates in the in failing assertion were written by the instructor. For more feedback, be sure to directly reference only one predicate from the assignment statement.");
		}
		else if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {

			throw new BothPredsStudentError("I can only give feedback around assertions that directly reference at least one predicate from the assignment statement.");
		}


		// If the student believes that i => s,
		// then they believe that if i then s. So constrain i to be { i AND s }
		if (isLhsInstructorAuthored) {

			// i is lhs
			// s is rhs
			if (op == 'sufficient') {
				// User believes i => s
				this.mutant = this.constrainPredicate(this.mutant, lhs_pred, rhs_pred, quantified_prefix)

			} else if (op == 'necessary') {
				// User believes s => i
				this.mutant = this.easePredicate(this.mutant, lhs_pred, rhs_pred, quantified_prefix)
			}
		}
		else {
			// i is rhs
			// s is lhs
			if (op == 'sufficient') {
				// User believes s => i
				this.mutant = this.easePredicate(this.mutant, rhs_pred, lhs_pred, quantified_prefix)

			} else if (op == 'necessary') {

				// User believes i => s
				this.mutant = this.constrainPredicate(this.mutant, rhs_pred, lhs_pred, quantified_prefix)
			}
		}
		throw new Error("Something went wrong!");
	}



	// failed_example needs to be an object, as returned by findExampleByName.
	mutateToExample(failed_example) {

		// TODO!! Should these be called on the wheat or the mutant?
		const sigNames = getSigList(this.wheat);
		const wheatPredNames = getPredList(this.wheat);


		// TODO: Potential ISSUE: What if they wrap the negation in () or extra {}? 
		const negationRegex = /(not|!)\s+(\b\w+\b)/;
		const isNegation = failed_example.examplePredicate.match(negationRegex);

		// Change the target predicate.
		if (isNegation != null) {
			failed_example.examplePredicate = isNegation[2];
		}





		// TODO: ISSUE: 
		// Double check the logic here, and do some debugging.



		const exampleAsPred = exampleToPred(failed_example, sigNames, wheatPredNames);
		let mutant_with_example = this.mutant + "\n" + exampleAsPred + "\n";

		this.mutant = (isNegation != null) ?
			// Student Belief: failedExample.exampleName => (not failedExample.examplePredicate)
			// Modify the wheat to be i' {	i and (not s)	}
			this.constrainPredicateByExclusion(mutant_with_example, failed_example.examplePredicate, failed_example.exampleName)
			// OR Student Belief :	failedExample.exampleName => failedExample.examplePredicate 
			: this.easePredicate(mutant_with_example, failed_example.examplePredicate, failed_example.exampleName);
	}





	mutateToStudentMisunderstanding(forge_output: string) : string {


		let w_os = forge_output.split("\n");

		for (var w_o in w_os) {


			//TODO: What should we do if an error is raised (eg. we cannot give feedback around this test!)

			if (example_regex.test(w_o)) {

				// Fundamentally the issue is that the characteristic predicate from a 
				// positive example gives us such a *specific* modification to a predicate,
				// that it is rare for us to offer meaningful feedback.

				const testName = getFailingTestName(w_o);
				const failedExample = findExampleByName(this.student_tests, testName);
				this.mutateToExample(failedExample);

			}

			if (quantified_assertion_regex.test(w_o)) {


				const match = w_o.match(quantified_assertion_regex);

				const row = parseInt(match[1]);
				const col = parseInt(match[2]);
				const span = parseInt(match[3]);
				const lhs_pred = match[4];
				const op = match[5];
				const rhs_pred = match[6];
				var failing_test = extractSubstring(this.source_text, row, col, span).trim();

				// Ensure this extraction works?
				const quantifier_match = /\bassert\b(.*?)\|/;
				const quantifier = failing_test.match(quantifier_match)[1].trim() + " | ";
				const lhs_match = /\|\s*(.*?)\s+is\b/;
				const lhs_instantiation = failing_test.match(lhs_match)[1].trim();
				const rhs_match = /\bfor\b(.*?)(\bfor\b|$)/;
				const rhs_instantiation = failing_test.match(rhs_match)[1].trim();
				
				this.mutateToAssertion(lhs_instantiation, rhs_instantiation, op, quantifier);
			}


			if (assertion_regex.test(w_o)) {


				// mutate to assertion
				const match = w_o.match(assertion_regex);
				const lhs_pred = match[1];
				const op = match[2];
				const rhs_pred = match[3];

				this.mutateToAssertion(lhs_pred, rhs_pred, op);

			}
			else if (test_regex.test(w_o)) {

				// Do nothing
				
			}
		}

		return this.mutant;
	}
}






export function adjustWheatToStudentMisunderstanding(testFileName: string, w: string, student_preds: string, w_o: string): string {
	const match = w_o.match(assertion_regex);
	const lhs_pred = match[1];
	const op = match[2];
	const rhs_pred = match[3];

	const isLhsInstructorAuthored = new RegExp(`\\b${lhs_pred}\\b`).test(w);
	const isRhsInstructorAuthored = new RegExp(`\\b${rhs_pred}\\b`).test(w);


	if (isLhsInstructorAuthored && isRhsInstructorAuthored) {
		throw new Error("I cannot provide you with any more feedback, since both predicates in the in failing assertion were written by the instructor. For more feedback, be sure to directly reference only one predicate from the assignment statement.");
	}
	else if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {

		throw new BothPredsStudentError("I can only give feedback around assertions that directly reference at least one predicate from the assignment statement.");
	}

	w = w + "\n" + student_preds + "\n";

	// If the student believes that s => i 
	// then they believe that if s then i. So ease i to be { i or s }

	// If the student believes that i => s,
	// then they believe that if i then s. So constrain i to be { i AND s }
	if (isLhsInstructorAuthored) {

		// i is lhs
		// s is rhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// (ie i => s)
			return constrainPredicate(w, lhs_pred, rhs_pred)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie s => i
			return easePredicate(w, lhs_pred, rhs_pred)
		}
	}
	else {
		// i is rhs
		// s is lhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// ie s => i
			return easePredicate(w, rhs_pred, lhs_pred)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie i => s
			return constrainPredicate(w, rhs_pred, lhs_pred)
		}
	}
	throw new Error("Something went wrong!");
}


export function adjustWheatToQuantifiedStudentMisunderstanding(source_text: string, w: string, student_preds: string, w_o: string): string {
	const match = w_o.match(quantified_assertion_regex);

	const row = parseInt(match[1]);
	const col = parseInt(match[2]);
	const span = parseInt(match[3]);
	const lhs_pred = match[4];
	const op = match[5];
	const rhs_pred = match[6];




	// I think this is still correct, since the regex doesn't check any opening '['s.
	const isLhsInstructorAuthored = new RegExp(`\\b${lhs_pred}\\b`).test(w);
	const isRhsInstructorAuthored = new RegExp(`\\b${rhs_pred}\\b`).test(w);


	if (isLhsInstructorAuthored && isRhsInstructorAuthored) {
		throw new Error("I cannot provide you with any more feedback, since both predicates in the in failing assertion were written by the instructor. For more feedback, be sure to directly reference only one predicate from the assignment statement.");
	}
	else if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {

		throw new BothPredsStudentError("I can only give feedback around assertions that directly reference at least one predicate from the assignment statement.");
	}

	w = w + "\n" + student_preds + "\n";


	var failing_test = extractSubstring(source_text, row, col, span).trim();

	// Ensure this extraction works?
	const quantifier_match = /\bassert\b(.*?)\|/;
	const quantifier = failing_test.match(quantifier_match)[1].trim() + " | ";
	const lhs_match = /\|\s*(.*?)\s+is\b/;
	const lhs_instantiation = failing_test.match(lhs_match)[1].trim();
	const rhs_match = /\bfor\b(.*?)(\bfor\b|$)/;
	const rhs_instantiation = failing_test.match(rhs_match)[1].trim();



	// If the student believes that s => i 
	// then they believe that if s then i. So ease i to be { i or s }

	// If the student believes that i => s,
	// then they believe that if i then s. So constrain i to be { i AND s }
	if (isLhsInstructorAuthored) {

		// i is lhs
		// s is rhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// (ie i => s)
			return constrainPredicate(w, lhs_instantiation, rhs_instantiation, quantifier)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie s => i
			return easePredicate(w, lhs_instantiation, rhs_instantiation, quantifier)
		}
	}
	else {
		// i is rhs
		// s is lhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// ie s => i
			return easePredicate(w, rhs_instantiation, lhs_instantiation, quantifier)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie i => s
			return constrainPredicate(w, rhs_instantiation, lhs_instantiation, quantifier)
		}
	}
	throw new Error("Something went wrong!");
}

