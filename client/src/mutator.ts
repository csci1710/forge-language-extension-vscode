import { info } from 'console';
import { getNameUpToParameters, example_regex, assertion_regex, quantified_assertion_regex, extractTestSuite, assertionToExpr, emptyOutPredicate, emptyOutAllPredicates } from './forge-utilities';
import { getPredicatesOnly, removeForgeComments, exampleToPred, getSigList, getPredList, findExampleByName, test_regex, getFailingTestName, retrievePredName } from './forge-utilities';



// This is buggy in cases where tests are the same
function extractSubstring(text: string, startRow: number, startColumn: number, span: number): string {

	// 1 index to 0 index
	startRow -= 1;

	span += 1;

	// Split the text into rows
	const rows = text.split("\n");

	// Validate if startRow and startColumn are within bounds
	if (startRow < 1 || startRow > rows.length) {
		throw new Error("Something went wrong while I was reading Forge output.");
	}
	if (startColumn > rows[startRow].length + 1) {
		throw new Error("Something went wrong while I was reading Forge output.");
	}

	// Calculate the starting index
	let startIndex = rows.slice(0, startRow).reduce((acc, currRow) => acc + currRow.length + 1, 0) + startColumn;

	// Extract and return the substring
	return text.substring(startIndex, startIndex + span);
}



// TODO: We should do something here that allows us to
// correctly underline predicates.

export class Mutator {

	wheat: string;
	student_preds: string;
	student_tests: string;
	forge_output: string;
	test_file_name: string;
	mutant: string;
	source_text: string;

	error_messages: string[];
	inconsistent_tests: string[];
	num_mutations: number = 0;
	max_mutations: number;

	/**
	 * Creates a new Mutator instance.
	 * @param wheat - The 'wheat'
	 * @param student_tests - Tests authored by the student.
	 * @param forge_output - Forge output after the source_text was run in Forge.
	 * @param test_file_name - The name of the student test file.
	 * @param source_text - The source_text of the *actual* file that was run in Forge.
	 * @param max_mutations - The maximum number of mutations that can be carried out(default: 200).
	 */
	constructor(wheat: string, student_tests: string, forge_output: string, test_file_name: string, source_text: string, max_mutations: number = 200) {
		this.wheat = wheat;
		this.student_tests = removeForgeComments(student_tests);
		this.forge_output = forge_output;
		this.student_preds = getPredicatesOnly(this.student_tests);
		this.test_file_name = test_file_name;
		this.mutant = this.wheat + "\n" + this.student_preds + "\n";
		this.source_text = source_text;
		this.error_messages = [];
		this.inconsistent_tests = [];
		this.max_mutations = max_mutations;
	}


	getInnerName(i : string) {

		
		
		this.num_mutations++;
		let name = i.includes('[') ? i.substring(0, i.indexOf('[')) : i;
		let params = i.includes('[') ? i.substring(i.indexOf('[')) : '';
		return `${name}_inner${this.num_mutations}${params}`;
	}


	// w : Current wheat, i : predicate to be constrained, s : predicate by which to constrain
	constrainPredicate(w: string, i: string, s: string, quantifer_prefix: string = ""): string {
		const i_inner = this.getInnerName(i);
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
		const i_inner = this.getInnerName(i);
		// User believes that ! s => i, even thought s => i.
		// So constrict i to be { i AND !s }

		const target_regexp = new RegExp("\\b" + i + "\\b", 'g');

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
		const i_inner = this.getInnerName(i);
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
		if (pred.includes('[')) {
			pred = pred.substring(0, pred.indexOf('['));
		}
		pred = pred.trim();

		var exp = `pred\\s+${pred}\\b`

		var x = new RegExp(exp).test(this.wheat);

		return x;
	}


	// Checks if the target predicate is instructor authored, and if it is a negation.
	checkTargetPredicate(pred: string) {
		const negationRegex = /(not|!)\s*(\b\w+\b)/;
		const isNegation = pred.match(negationRegex);

		const isParameterized = pred.includes('[');

		// Change the target predicate.
		if (isNegation != null) {
			pred = isNegation[2];
		}
		return {
			predIsInstructorAuthored: this.isInstructorAuthored(pred),
			isNegation: isNegation != null,
			pred: pred,
			isParameterized: isParameterized
		}
	}


	mutateToAssertion(test_name: string, lhs_pred: string, rhs_pred: string, op: string, quantified_prefix: string = ""): void {


		const isLhsInstructorAuthored = this.isInstructorAuthored(lhs_pred);
		const isRhsInstructorAuthored = this.isInstructorAuthored(rhs_pred);


		if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {
			this.error_messages.push(`❗Excluding ${test_name} from analysis. I can only give feedback around assertions that directly reference at least one predicate from the assignment statement.`);
			return;
		}
		

		if (isLhsInstructorAuthored && isRhsInstructorAuthored) {
			this.error_messages.push(`❗Excluding ${test_name} from analysis, since both predicates in the in failing assertion were written by the instructor. For more feedback, be sure to directly reference only one predicate from the assignment statement.`);
			return;
		}
		this.inconsistent_tests.push(test_name);


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


		const sigNames = getSigList(this.wheat);
		const wheatPredNames = getPredList(this.wheat);


		// TODO: Potential ISSUE: What if they wrap the negation in () or extra {}? 
		const negationRegex = /(not|!)\s*(\b\w+\b)/;
		const isNegation = failed_example.examplePredicate.match(negationRegex);

		// Change the target predicate.
		if (isNegation != null) {
			failed_example.examplePredicate = isNegation[2];
		}


		if (!wheatPredNames.includes(getNameUpToParameters(failed_example.examplePredicate))) {
			this.error_messages.push(`⛔ Example ${failed_example.exampleName} is not consistent with the assignment. However, I cannot provide more feedback since it does not test a predicate defined in the assignment statement.`);
			return;
		}

		if (!wheatPredNames.includes(failed_example.examplePredicate)) {
			this.error_messages.push(`⛔ Example ${failed_example.exampleName} is not consistent with the problem statement. However, I cannot provide more detailed feedback since it tests parameterized predicate ${getNameUpToParameters(failed_example.examplePredicate)}.`);
			return;
		}

		this.inconsistent_tests.push(failed_example.exampleName);

		const exampleAsPred = exampleToPred(failed_example, sigNames, wheatPredNames);
		let mutant_with_example = this.mutant + "\n" + exampleAsPred + "\n";




		this.mutant = (isNegation != null) ?
			// Student Belief: failedExample.exampleName => (not failedExample.examplePredicate)
			// Modify the wheat to be i' {	i and (not s)	}
			this.constrainPredicateByExclusion(mutant_with_example, failed_example.examplePredicate, failed_example.exampleName)
			// OR Student Belief :	failedExample.exampleName => failedExample.examplePredicate 
			: this.easePredicate(mutant_with_example, failed_example.examplePredicate, failed_example.exampleName);
	}


	mutateToStudentMisunderstanding() {

		let w_os = this.forge_output.split("\n");
		for (let w_o of w_os) {

			// Do not carry out any more than the maximum number of mutations.
			if (this.num_mutations >= this.max_mutations) {
				break;
			}

			const testName = getFailingTestName(w_o);

			if (example_regex.test(w_o)) {
				const failedExample = findExampleByName(this.student_tests, testName);
				this.mutateToExample(failedExample);

			} else if (quantified_assertion_regex.test(w_o)) {


				const match = w_o.match(quantified_assertion_regex);

				if (match == null) {
					this.error_messages.push(`❗Unexpected Error: Excluding test "${testName}" from my analysis.`);
					return;
				}

				const row = parseInt(match[1]);
				const col = parseInt(match[2]);
				const span = parseInt(match[3]);
				const lhs_pred = match[4];
				const op = match[5];
				const rhs_pred = match[6];

				var failing_test = extractSubstring(this.source_text, row, col, span).trim();

				

				function extractMatch(rx, s : string, index) {
					let match = s.match(rx);
					if (!match || !match[index] ) {
						return "";
					}
					return match[index].trim();
				}


				const quantifier_match = /\bassert\b(.*?)\|/;
				const quantifier = extractMatch(quantifier_match, failing_test, 1) + " | ";
				const lhs_match = /\|\s*(.*?)\s+is\b/;
				const lhs_instantiation = extractMatch(lhs_match,failing_test , 1)
				const rhs_match = /\bfor\b(.*?)(\bfor\b|$)/;
				const rhs_instantiation = extractMatch(rhs_match, failing_test, 1);
				this.mutateToAssertion(testName, lhs_instantiation, rhs_instantiation, op, quantifier);
			} else if (assertion_regex.test(w_o)) {
				const match = w_o.match(assertion_regex);

				if (match == null) {
					this.error_messages.push(`❗Unexpected Error: Excluding test "${testName}" from my analysis.`);
					return;
				}

				const lhs_pred = match[1];
				const op = match[2];
				const rhs_pred = match[3];

				this.mutateToAssertion(testName, lhs_pred, rhs_pred, op);
			}
			else if (test_regex.test(w_o)) {

				const test_expect_failure_msg = `❗Excluding test "${testName}" from my analysis. I cannot provide feedback around test-expects.`;
				this.error_messages.push(test_expect_failure_msg)
			}
			else if (testName != "") {
				throw new Error("Something went very wrong!");
			}
		}

		return this.num_mutations;
	}


	xor(a: boolean, b: boolean): boolean {
		return (a && !b) || (!a && b);
	};


	mutateToNegativeTests() {


		const test_suites = extractTestSuite(this.student_tests)

		test_suites.forEach((test_suite) => {

			const predicate_under_test = test_suite?.predicateName;

			const examples = test_suite?.tests.examples || [];
			const assertions = test_suite?.tests.assertions || [];
			const quantified_assertions = test_suite?.tests.quantifiedAssertions || [];

			if (examples.length > 0 || assertions.length > 0 || quantified_assertions.length > 0) {
				this.mutant = emptyOutPredicate(this.mutant, predicate_under_test);
			}
			else
			{
				this.error_messages.push(`❗You have written no examples or assertions in the test suite for ${predicate_under_test}.`);
			}
		});

		/*
			- For each test-suite, identify the predicate being tested.
			- For each test in the suite.
				- Produce a predicate that characterizes the test.
				- Exclude these predicates from the predicate under test.
		*/

		// Mutant already has all student predicates in it.


		// Now we have all the positive tests
		// And all the negative tests


		// We should segregate the test suite into both positive and negative tests.
		// Positive tests should have a destructive approach and run

		// Negative tests should have a constructive approach and run

		// If an ag test passes *both*, it is a thoroughness candidate.

		test_suites.forEach((test_suite) => {


			const predicate_under_test = test_suite?.predicateName;
			const examples = test_suite?.tests.examples || [];
			const assertions = test_suite?.tests.assertions || [];
			const quantified_assertions = test_suite?.tests.quantifiedAssertions || [];

			
			assertions.forEach((assertion) => {

				// Just mutate to assertion.
				const lhs = this.isInstructorAuthored(assertion['lhs']);
				const rhs = this.isInstructorAuthored(assertion['rhs']);
				if (this.xor(lhs, rhs)) {

					// Now check if it is a negative assertion.
					// That is: i => s

					var isNegativeAssertion = (rhs && assertion['op'] == 'necessary')   || (lhs && assertion['op'] == 'sufficient');

					if (isNegativeAssertion) {
						this.mutateToAssertion(assertion['assertionName'], assertion['lhs'], assertion['rhs'], assertion['op'])
					}
				}
				else {
					this.error_messages.push(`❗Excluding ${assertion['assertionName']} from thoroughness analysis. I can only give feedback around assertions that directly reference at exactly one predicate from the assignment statement.`);
				}
			});

			quantified_assertions.forEach((qassertion) => {
				const lhs = this.isInstructorAuthored(qassertion['lhs']);
				const rhs = this.isInstructorAuthored(qassertion['rhs']);

				if (this.xor(lhs, rhs)) {

					var isNegativeAssertion = (rhs && qassertion['op'] == 'necessary')   || (lhs && qassertion['op'] == 'sufficient');
					if (isNegativeAssertion) {
						this.mutateToAssertion(qassertion['assertionName'], qassertion['lhs'], qassertion['rhs'], qassertion['op'], qassertion['quantifiedVars'])
					}
				}
				else {
					this.error_messages.push(`❗Excluding ${qassertion['assertionName']} from thoroughness analysis. I can only give feedback around assertions that directly reference at exactly one predicate from the assignment statement.`);
				}
			});


			// Ignore examples, since a negative example is a positive test of !pred
			examples.forEach((example) => {
				const pred_info = this.checkTargetPredicate(example['examplePredicate']);
				if (pred_info.predIsInstructorAuthored) {

					if (pred_info.isParameterized) {
						this.error_messages.push(`❗Excluding Example ${example['exampleName']} from thoroughness analysis, since it references parameterized predicate ${pred_info.pred}`);
						return;
					}

					// Negative examples only
					if (pred_info.isNegation) {

						this.mutateToExample(example);
					}
				}
				else {
					this.error_messages.push(`❗Excluding Example ${example['exampleName']} from thoroughness analysis. I can only give feedback around examples that directly reference one predicate from the assignment statement.`);
				}
			});

		});



	}

	mutateToPositiveTests() {
		let predicates_to_add_to_mutation : string[] = [];
		let expressions_in_mutation : Object[] = [];


		const test_suites = extractTestSuite(this.student_tests)
		
		test_suites.forEach((test_suite) => {
			const predicate_under_test = test_suite?.predicateName;
			const examples = test_suite?.tests.examples || [];
			const assertions = test_suite?.tests.assertions || [];
			const quantified_assertions = test_suite?.tests.quantifiedAssertions || [];

			examples.forEach((example) => {
				const pred_info = this.checkTargetPredicate(example['examplePredicate']);
				if (pred_info.predIsInstructorAuthored) {


					if (pred_info.isParameterized) {
						this.error_messages.push(`❗Excluding Example ${example['exampleName']} from thoroughness analysis, since it references parameterized predicate ${pred_info.pred}`);
						return;
					}

					if (!pred_info.isNegation) {	
						let p = exampleToPred(example, getSigList(this.wheat), getPredList(this.wheat));
						predicates_to_add_to_mutation.push(p);
						expressions_in_mutation.push({ "name": example['exampleName'], "expression": example['exampleName'], predicate_under_test: getNameUpToParameters(example['examplePredicate']), isNegativeTest: pred_info.isNegation });
					}
				}
				else {
					this.error_messages.push(`❗Excluding Example ${example['exampleName']} from thoroughness analysis. I can only give feedback around examples that directly reference one predicate from the assignment statement.`);
				}
			});


			assertions.forEach((assertion) => {
				const lhs = this.isInstructorAuthored(assertion['lhs']);
				const rhs = this.isInstructorAuthored(assertion['rhs']);
				if (this.xor(this.isInstructorAuthored(assertion['lhs']),
					this.isInstructorAuthored(assertion['rhs']))) {



					// Now check if it is a negative assertion.
					// That is: i => s
					var isNegativeAssertion = (rhs && assertion['op'] == 'necessary')   || (lhs && assertion['op'] == 'sufficient');

					// Create the appropriate predicate.
					// ie create the characteristic predicate of the example.		
					
					
					if (!isNegativeAssertion) {
						let e = assertionToExpr(assertion['lhs'], assertion['rhs'], assertion['op']);
						expressions_in_mutation.push({ "name": assertion['assertionName'], "expression": e, predicate_under_test });
					}

				}
				else {
					this.error_messages.push(`❗Excluding ${assertion['assertionName']} from thoroughness analysis. I can only give feedback around assertions that directly reference at exactly one predicate from the assignment statement.`);
				}
			});

			// For each quantified assertion, modify predicates.
			quantified_assertions.forEach((qassertion) => {


				// This is where we need to check if the predicate is instructor authored.
				const lhs = this.isInstructorAuthored(qassertion['lhs']);
				const rhs = this.isInstructorAuthored(qassertion['rhs']);

				if (this.xor(lhs, rhs)) {
					var isNegativeAssertion = (rhs && qassertion['op'] == 'necessary')   || (lhs && qassertion['op'] == 'sufficient');

					if (!isNegativeAssertion) {
						let e = assertionToExpr(qassertion['lhs'], qassertion['rhs'], qassertion['op'], qassertion['quantifiedVars']);
						expressions_in_mutation.push({ "name": qassertion['assertionName'], "expression": e, predicate_under_test });
					}
				}
				else {
					this.error_messages.push(`❗Excluding ${qassertion['assertionName']} from thoroughness analysis. I can only give feedback around assertions that directly reference at exactly one predicate from the assignment statement.`);
				}
			});
		});

		// Now add all the predicates to the current mutation.
		var added_preds = predicates_to_add_to_mutation.join("\n");
		this.mutant += added_preds;

		for (let e of expressions_in_mutation) {

			if (e.hasOwnProperty('isNegativeTest') && e['isNegativeTest']) {
				this.mutant = this.easePredicate(this.mutant, e['predicate_under_test'], e['expression']);
			} else {
				this.mutant = this.constrainPredicateByExclusion(this.mutant, e['predicate_under_test'], e['expression']);
			}
		}
	}



	mutateToVaccuity() {
		this.mutant = emptyOutAllPredicates(this.mutant);
	}
}

