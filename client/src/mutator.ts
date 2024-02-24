import { get } from 'http';
import { example_regex, assertion_regex, quantified_assertion_regex, extractTestSuite , assertionToExpr} from './forge-utilities';
import { getPredicatesOnly, removeForgeComments, exampleToPred, getSigList, getPredList, findExampleByName , test_regex, getFailingTestName} from './forge-utilities';

/*
	ISSUES:
	- Quantifier Predicates and their mutation needs to be thought through a bit!



*/


// This is buggy in cases where tests are the same
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

	let row_to_check = rows[startRow];


	// Calculate the starting index
	let startIndex = rows.slice(0, startRow).reduce((acc, currRow) => acc + currRow.length + 1, 0) + startColumn;

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

	error_messages : string[];

	inconsistent_tests : string[];


	num_mutations : number = 0;

	constructor(wheat: string, student_tests: string, forge_output: string, test_file_name: string, source_text : string) {
		this.wheat = wheat;

		this.student_tests = removeForgeComments(student_tests);
		this.forge_output = forge_output;
		this.student_preds = getPredicatesOnly(this.student_tests);
		this.test_file_name = test_file_name;


		this.mutant = this.wheat + "\n" + this.student_preds + "\n";
		this.source_text = source_text;
		this.error_messages = [];
		this.inconsistent_tests = [];
	}


	getInnerPostfix() {
		this.num_mutations++;
		return `_inner${this.num_mutations}`;
	}


	// w : Current wheat, i : predicate to be constrained, s : predicate by which to constrain
	constrainPredicate(w: string, i: string, s: string, quantifer_prefix: string = ""): string {
		const i_inner = i + this.getInnerPostfix();
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
		const i_inner = i + this.getInnerPostfix();
		// User believes that ! s => i, even thought s => i.
		// So constrict i to be { i AND !s }

		const target_regexp = new RegExp("\\b" + i + "\\b", 'g');


		// TODO: FIX: IS THIS CORRECT?
		let w_wrapped = w.replace(target_regexp, i_inner);
		let exp_to_constrain = s.replace(target_regexp, i_inner);
		let added_pred =
			`
			pred ${i} { 
				${quantifer_prefix} ${i_inner} and not ${exp_to_constrain}
			}
			`
		return w_wrapped + added_pred;
	}

	easePredicate(w: string, i: string, s: string, quantifer_prefix: string = ""): string {
		const i_inner = i + this.getInnerPostfix();
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
		var exp = `pred\\s+${pred}\\b`
		var x = new RegExp(exp).test(this.wheat);
		return x;
	}


	checkTargetPredicate(pred: string) {
		const negationRegex = /(not|!)\s*(\b\w+\b)/;
		const isNegation = pred.match(negationRegex);

		// Change the target predicate.
		if (isNegation != null) {
			pred = isNegation[2];
		}
		return {
			predIsInstructorAuthored : this.isInstructorAuthored(pred),
			isNegation : isNegation != null,
			pred: pred
		} 
	}


	mutateToAssertion(test_name : string, lhs_pred: string, rhs_pred: string, op: string, quantified_prefix: string = "") : void {


		const isLhsInstructorAuthored = this.isInstructorAuthored(lhs_pred);
		const isRhsInstructorAuthored = this.isInstructorAuthored(rhs_pred);


		if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {
			this.error_messages.push(`Excluding ${test_name} from analysis. I can only give feedback around assertions that directly reference at least one predicate from the assignment statement.`);
			return;
		}
		this.inconsistent_tests.push(test_name);


		if (isLhsInstructorAuthored && isRhsInstructorAuthored) {
			this.error_messages.push(`I cannot provide you with further feedback around ${test_name}, since both predicates in the in failing assertion were written by the instructor. For more feedback, be sure to directly reference only one predicate from the assignment statement.`);
			return;
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

	}



	// failed_example needs to be an object, as returned by findExampleByName.
	mutateToExample(failed_example) {

		// TODO!! Should these be called on the wheat or the mutant?
		const sigNames = getSigList(this.wheat);
		const wheatPredNames = getPredList(this.wheat);

		this.inconsistent_tests.push(failed_example.exampleName);
		// TODO: Potential ISSUE: What if they wrap the negation in () or extra {}? 
		const negationRegex = /(not|!)\s+(\b\w+\b)/;
		const isNegation = failed_example.examplePredicate.match(negationRegex);

		// Change the target predicate.
		if (isNegation != null) {
			failed_example.examplePredicate = isNegation[2];
		}


		if (!wheatPredNames.includes(failed_example.examplePredicate)) {
			this.error_messages.push(`I cannot provide feedback around ${failed_example.exampleName} since it does not test a predicate defined in the assignment statement.`);
			return;
		}

		const exampleAsPred = exampleToPred(failed_example, sigNames, wheatPredNames);
		let mutant_with_example = this.mutant + "\n" + exampleAsPred + "\n";

		this.mutant = (isNegation != null) ?
			// Student Belief: failedExample.exampleName => (not failedExample.examplePredicate)
			// Modify the wheat to be i' {	i and (not s)	}
			this.constrainPredicateByExclusion(mutant_with_example, failed_example.examplePredicate, failed_example.exampleName)
			// OR Student Belief :	failedExample.exampleName => failedExample.examplePredicate 
			: this.easePredicate(mutant_with_example, failed_example.examplePredicate, failed_example.exampleName);
	}

// TODO: This does not error  loudly!
	mutateToStudentMisunderstanding()  {

		let w_os = this.forge_output.split("\n");
		for (let w_o of w_os) {	
			const testName = getFailingTestName(w_o);

			if (example_regex.test(w_o)) {				
				// Fundamentally the issue is that the characteristic predicate from a 
				// positive example gives us such a *specific* modification to a predicate,
				// that it is rare for us to offer meaningful feedback.
				
				const failedExample = findExampleByName(this.student_tests, testName);
				this.mutateToExample(failedExample);
				
			} else if (quantified_assertion_regex.test(w_o)) {


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
				
				this.mutateToAssertion(testName, lhs_instantiation, rhs_instantiation, op, quantifier);


	
			}else if (assertion_regex.test(w_o)) {


				// mutate to assertion
				const match = w_o.match(assertion_regex);
				const lhs_pred = match[1];
				const op = match[2];
				const rhs_pred = match[3];

				this.mutateToAssertion(testName, lhs_pred, rhs_pred, op);
			}
			else if (test_regex.test(w_o)) {

				const test_expect_failure_msg = `Excluding test "${testName}" from my analysis. I cannot provide feedback around test-expects.`;
				this.error_messages.push(test_expect_failure_msg)	
			}
			else if (testName != "") {
				throw new Error("Something went very wrong!");
			}
		}

		return this.num_mutations;
	}


	xor (a: boolean, b: boolean): boolean  {
		return (a && !b) || (!a && b);
	};


	mutateToStudentUnderstanding() {

		
/*
    - For each test-suite, identify the predicate being tested.
	- For each test in the suite.
		- Produce a predicate that characterizes the test.
		- Exclude these predicates from the predicate under test.
*/

		// Mutant already has all student predicates in it.


		let predicates_to_add_to_mutation = [];
		let expressions_in_mutation = [];


		extractTestSuite(this.student_tests).forEach((test_suite) => {


			const predicate_under_test = test_suite.predicateName;	
			const examples = test_suite.tests.examples;
			const assertions = test_suite.tests.assertions;
			const quantified_assertions = test_suite.tests.quantifiedAssertions;

			// For each of these, filter out examples around which we cannot give feedback.
			
			// Now for each example, modify predicates.
			examples.forEach((example) => {


				const pred_info = this.checkTargetPredicate(example['examplePredicate']);
				if(pred_info.predIsInstructorAuthored) {
					// Ensure the types match up
					// I *think* this is right?


					if (pred_info.isNegation) {
						example['examplePredicate'] = pred_info.pred;
					}
					// Need to deal with negative predicates here



					let p = exampleToPred(example, getSigList(this.wheat), getPredList(this.student_tests));
	
					predicates_to_add_to_mutation.push(p);
					expressions_in_mutation.push({ "name" : example['exampleName'], "expression" : example['exampleName'], predicate_under_test: example['examplePredicate'], isNegativeTest : pred_info.isNegation	});
				}
				else {
					this.error_messages.push(`Excluding ${example['exampleName']} from analysis. I can only give feedback around examples that directly reference one predicate from the assignment statement.`);
				}
			});

			/*
				{ assertionName, quantifiedVars, lhs, op, rhs }
			*/

			// For each assertion, modify predicates.
			assertions.forEach((assertion) => {
				if(this.xor(this.isInstructorAuthored(assertion['lhs']),
				 	   this.isInstructorAuthored(assertion['rhs']))) {
					
						// Create the appropriate predicate.
						// ie create the characteristic predicate of the example.				
						let e = assertionToExpr(assertion['lhs'], assertion['rhs'], assertion['op']);
						expressions_in_mutation.push({ "name" : assertion['assertionName'], "expression" : e, predicate_under_test	});
						
				}
			});

			// For each quantified assertion, modify predicates.
			quantified_assertions.forEach((qassertion) => {
				if(this.xor(this.isInstructorAuthored(qassertion['lhsPredicate']),
				 	   this.isInstructorAuthored(qassertion['rhsPredicate']))) {
					
						// Create the appropriate predicate (ie create the characteristic predicate of the example.)
						let e = assertionToExpr(qassertion['lhs'], qassertion['rhs'], qassertion['op'], qassertion['quantifiedVars']);
						expressions_in_mutation.push({ "name" : qassertion['assertionName'], "expression" : e, predicate_under_test	});
				}
			});
		});

		// Now add all the predicates to the current mutation.
		var added_preds = predicates_to_add_to_mutation.join("\n");
		this.mutant += added_preds;
		
		// I think this is it
		for (let e of expressions_in_mutation) {

			if (e.hasOwnProperty('isNegativeTest') && e['isNegativeTest']) {
				// I think we easy the predicate here right?
				// TODO: Think about this.
				this.mutant = this.easePredicate(this.mutant, e['predicate_under_test'], e['expression']);
			} else {
				// TODO: This works for positive examples and implications, but NOT negative examples.
				this.mutant = this.constrainPredicateByExclusion(this.mutant, e['predicate_under_test'], e['expression']);
			}


			
			
		}
	}

}




