import { getNameUpToParameters, example_regex, assertion_regex, quantified_assertion_regex, extractTestSuite, assertionToExpr, emptyOutPredicate, emptyOutAllPredicates } from './forge-utilities';
import { getPredicatesOnly, removeForgeComments, exampleToPred, getSigList, getPredList, findExampleByName, test_regex, getFailingTestName, retrievePredName } from './forge-utilities';
import { window } from 'vscode';


import {
	ForgeUtil,
	Block,
	Sig, Predicate, Function,
	Test, AssertionTest, QuantifiedAssertionTest, Example, SatisfiabilityAssertionTest,
	Formula, Expr
} from "forge-toadus-parser";





class HydratedPredicate {
	constructor(
		public name: string,
		public params: Record<string, string>,
		public body: string
	) {

	}

	declParams(): string {
		let paramStrings = [];
		for (let [name, type] of Object.entries(this.params)) {
			paramStrings.push(`${name}: ${type}`);
		}

		if (paramStrings.length == 0) {
			return "";
		}

		let paramStringsJoined = paramStrings.join(", ");
		return "[" + paramStringsJoined + "]";
	}

	callParams(): string {
		let paramStrings = [];
		for (let [name, type] of Object.entries(this.params)) {
			paramStrings.push(name);
		}

		if (paramStrings.length == 0) {
			return "";
		}

		let paramStringsJoined = paramStrings.join(", ");
		return "[" + paramStringsJoined + "]";
	}
}



function get_block_from_active_editor(fromRow: number, toRow: number, fromColumn: number, toColumn: number): string {
	// Get the active editor
	// Get the text from the active editor
	// Return the text from the given row and column to the given row and column
	let activeEditor = window.activeTextEditor;
	if (!activeEditor) {
		return ""; //What?
	}
	let text = activeEditor.document.getText();
	return get_text_block(fromRow, toRow, fromColumn, toColumn, text);
}

function get_text_block(fromRow: number, toRow: number, fromColumn: number, toColumn: number, text: string): string {
	let lines = text.split("\n");
	let block = "";

	// TODO: To and from rows are correct!

	for (let i = fromRow; i <= toRow; i++) {
		let line = lines[i - 1];
		if (i == fromRow) {
			block += line.substring(fromColumn - 1);
		} else if (i == toRow) {
			block += line.substring(0, toColumn);
		} else {
			block += line;
		}
		block += "\n";
	}
	return block;
}


function get_text_from_block(b: Block, text: string): string {

	if (!b) {
		return "";
	}

	return get_text_block(b.fromRow, b.toRow, b.fromColumn, b.toColumn, text);
}



// TODO: Mutated predicates shold









/*
	Mutates a Forge ``wheat'' (aka correct solution)
	to generate a mutant that is consistent with the student's
	tests.
*/
export class ConceptualMutator {

	error_messages: string[];
	inconsistent_tests: string[];
	num_mutations: number = 0;

	wheat_util: ForgeUtil;
	student_util: ForgeUtil;
	full_source_util: ForgeUtil;

	mutant: HydratedPredicate[] = [];


	/**
	 * Creates a new Mutator instance.
	 * @param wheat - The 'wheat'
	 * @param student_tests - Tests authored by the student.
	 * @param forge_output - Forge output after the source_text was run in Forge.
	 * @param test_file_name - The name of the student test file.
	 * @param source_text - The source_text of the *actual* file that was run in Forge. In the case of a Toadus ponens run, this is what you get AFTER joining WHEAT + STUDENT_PREDICATES.
	 * @param max_mutations - The maximum number of mutations that can be carried out(default: 200).
	 */
	constructor(public wheat: string,
		public student_tests: string,
		public forge_output: string,
		public test_file_name: string,
		public source_text: string,
		public max_mutations: number = 200) {

		this.wheat_util = new ForgeUtil(wheat);
		this.student_util = new ForgeUtil(student_tests);
		this.full_source_util = new ForgeUtil(source_text);

		this.wheat_util.processSpec();
		this.student_util.processSpec();
		this.full_source_util.processSpec();
		this.error_messages = [];
		this.inconsistent_tests = [];

		function predicateToHydratedPredicate(p: Predicate): HydratedPredicate {
			let name = p.name;
			let body = get_text_from_block(p.block, source_text);
			let params_text = get_text_from_block(p.params, source_text);

			let params = {};
			let param_strings = params_text.split(",");
			for (let param_string of param_strings) {
				let [name, type] = param_string.split(":");
				params[name.trim()] = type.trim();
			}
			return new HydratedPredicate(name, params, body);
		}

		this.mutant = this.full_source_util.getPreds().map(predicateToHydratedPredicate);
	}




	/**
	 * 
	 * @returns A mutated version of the wheat that is consistent with the student's tests.
	 */
	public generateMutantConsistentWithFailingTests() : string {

		let w_os = this.forge_output.split("\n");
		for (let w_o of w_os) {

			// Do not carry out any more than the maximum number of mutations.
			if (this.num_mutations >= this.max_mutations) {
				break;
			}

			const testName = getFailingTestName(w_o);

			if (example_regex.test(w_o)) {
				// Mutate to example

			} else if (quantified_assertion_regex.test(w_o)) {


				const match = w_o.match(quantified_assertion_regex);

				if (match == null) {
					this.error_messages.push(`❗Unexpected Error: Excluding test "${testName}" from my analysis.`);
					return;
				}





				// Need to find the assertion.
				// And mutate to the quantified assertion.
			}
			else if (assertion_regex.test(w_o)) {
				const match = w_o.match(assertion_regex);

				if (match == null) {
					this.error_messages.push(`❗Unexpected Error: Excluding test "${testName}" from my analysis.`);
					return;
				}

				
				const lhs_pred = match[1];
				const op = match[2];
				const rhs_pred = match[3];

				// Need to find the assertion. This I think we can do with left / right.
				// And mutate to the assertion.

			}
			else if (test_regex.test(w_o)) {

				const test_expect_failure_msg = `❗Excluding test "${testName}" from my analysis. I cannot provide feedback around test-expects.`;
				this.error_messages.push(test_expect_failure_msg)
			}
			else if (testName != "") {
				throw new Error("Something went very wrong!");
			}
		}


		return this.mutantToString();
	}



	protected mutantToString(): string {

		let predStrings = this.mutant.map((p) => {
			let declParams = p.declParams();
			let body = p.body;
			return `pred ${p.name}${declParams}\n {\n ${body} \n}`;
		});

		let PREFIX = "#lang forge\n option run_sterling off\n";
		let sigDecls = []; // TODO!
		let sigs = sigDecls.join("\n\n");

		let predicates = predStrings.join("\n\n");
		return `${PREFIX}\n${sigs}\n\n${predicates}`;

	}





	private isInstructorAuthored(p: Predicate): boolean {

		let wheat_predicates: Predicate[] = this.wheat_util.getPreds();

		for (let wp of wheat_predicates) {
			if (wp.name == p.name) {
				return true;
			}
		}
		return false;
	}

	private xor(a: boolean, b: boolean): boolean {
		return (a && !b) || (!a && b);
	};

	private getNewName(name: string) {
		this.num_mutations++;
		return `${name}_inner_${this.num_mutations}`;
	}


	// Eases predicate i in the mutant to also accept s.
	// i and s are both predicate names.
	protected easePredicate(i: string, s: string, quantified_prefix: string = ""): void {

		let p_i: HydratedPredicate = this.mutant.find((p) => p.name == i);
		let p_s: HydratedPredicate = this.mutant.find((p) => p.name == s);


		if (!p_i || !p_s) {
			this.error_messages.push(`❗Predicate ${i} or ${s} not found! Something is very wrong, please contact the instructor.`);
			return;
		}

		const newName_i = this.getNewName(i);
		p_i.name = newName_i;


		let callParams = p_i.callParams();
		let new_i_body = `${quantified_prefix} (${newName_i}${callParams} or ${s})`;

		let p_i_prime = new HydratedPredicate(i, p_i.params, new_i_body);
		this.mutant.push(p_i_prime);

	}


	protected constrainPredicateByInclusion(i: string, s: string, quantified_prefix: string = ""): void {

		let p_i: HydratedPredicate = this.mutant.find((p) => p.name == i);
		let p_s: HydratedPredicate = this.mutant.find((p) => p.name == s);


		if (!p_i || !p_s) {
			this.error_messages.push(`❗Predicate ${i} or ${s} not found! Something is very wrong, please contact the instructor.`);
			return;
		}

		const newName_i = this.getNewName(i);

		p_i.name = newName_i;
		let callParams = p_i.callParams();
		let new_i_body = `${quantified_prefix} (${newName_i}${callParams} and ${s})`;

		// New i = old i AND s.
		let p_i_prime = new HydratedPredicate(i, p_i.params, new_i_body);
		this.mutant.push(p_i_prime);
	}

	protected constrainPredicateByExclusion(i: string, s: string, quantified_prefix: string = ""): void {

		let p_i: HydratedPredicate = this.mutant.find((p) => p.name == i);
		let p_s: HydratedPredicate = this.mutant.find((p) => p.name == s);


		if (!p_i || !p_s) {
			this.error_messages.push(`❗Predicate ${i} or ${s} not found! Something is very wrong, please contact the instructor.`);
			return;
		}

		const newName_i = this.getNewName(i);

		p_i.name = newName_i;
		let callParams = p_i.callParams();

		let new_i_body = `${quantified_prefix} (${newName_i}${callParams} and (not ${s}))`;

		let p_i_prime = new HydratedPredicate(i, p_i.params, new_i_body);
		this.mutant.push(p_i_prime);
	}
	/////////////////////////////////////////////////////////////////////////

	/*
		Mutates the wheat to generate a mutant that is consistent with the student's tests.
		ASSUMES THAT either LHS or RHS is authored by the instructor.

	*/
	protected mutateToAssertion(a: AssertionTest) {

		// TEST IS ALWAYS OF THE FORM pred => prop
		// SO BELIEF IS ALWAYS lhs => rhs
		let lhs = a.pred;
		let rhs = a.prop;
		let rel = a.check;

		let lhs_in_wheat = this.isInstructorAuthored(lhs);
		let rhs_in_wheat = this.isInstructorAuthored(rhs);


		let test_name = (rel === "sufficient") ? `${lhs.name} is sufficient for ${rhs.name}` : `${rhs.name} is necessary for ${lhs.name}`;

		if (!(this.xor(lhs_in_wheat, rhs_in_wheat))) {
			this.error_messages.push(`❗Excluding assert ${test_name} from analysis. I can only give feedback around assertions that directly reference exactly one predicate from the assignment statement.`);
			return;
		}

		this.inconsistent_tests.push(test_name);


		if (lhs_in_wheat) {
			this.constrainPredicateByInclusion(lhs, rhs);
		}
		else {
			this.easePredicate(rhs, lhs);
		}
	}


	protected mutateToQuantifiedAssertion(a: QuantifiedAssertionTest) {
		// TEST IS ALWAYS OF THE FORM pred => prop
		// SO BELIEF IS ALWAYS lhs => rhs
		let lhs = a.pred;
		let rhs = a.prop;
		let rel = a.check;
		let disj = (a.disj) ? "disj" : "";

		const quantifier = "all";
		const quantDecls = get_text_from_block(a.quantDecls, this.source_text);

		const quantifiedPrefix = `${quantifier} ${disj} ${quantDecls} `;

		let lhs_in_wheat = this.isInstructorAuthored(lhs);
		let rhs_in_wheat = this.isInstructorAuthored(rhs);


		let test_name = (rel === "sufficient") ? `${quantifiedPrefix} ${lhs.name} is sufficient for ${rhs.name}` : `${rhs.name} is necessary for ${lhs.name}`;

		if (!(this.xor(lhs_in_wheat, rhs_in_wheat))) {
			this.error_messages.push(`❗Excluding assert ${test_name} from analysis. I can only give feedback around assertions that directly reference exactly one predicate from the assignment statement.`);
			return;
		}

		this.inconsistent_tests.push(test_name);

		if (lhs_in_wheat) {
			this.constrainPredicateByInclusion(lhs, rhs, quantifiedPrefix);
		}
		else {
			this.easePredicate(rhs, lhs, quantifiedPrefix);
		}

	}



	protected mutateToExample(e: Example) {

		// Determine if positive or negative example.
		// Find if testExpr
		const negationRegex = /(not|!)\s*(\b\w+\b)/;
		let exampletestExpr = get_text_from_block(e.textExpr, this.source_text);
		let negativeExample = exampletestExpr.match(negationRegex);

		// Pred under test
		let p_i = exampletestExpr;
		if (negativeExample) {
			p_i = negativeExample[2];
		}

		// Ensure p_i is in the wheat.
		if (!this.isInstructorAuthored(p_i)) {
			this.error_messages.push(`⛔ Example ${e.name} is not consistent with the assignment. However, I cannot provide more feedback since it does not test a predicate defined in the assignment statement.`);
			return;
		}

		this.inconsistent_tests.push(e.name);


		// Example to characteristic predicate.
		let hp = this.exampleToPredicate(e);

		this.mutant.push(hp);

		if (negativeExample) {
			// Student Belief: failedExample.exampleName => (not failedExample.examplePredicate)
			this.constrainPredicateByExclusion(p_i, hp.name);
		}
		else {
			// OR Student Belief :	failedExample.exampleName => failedExample.examplePredicate 
			this.easePredicate(p_i, hp.name);
		}
	}

	/// How would this even work?
	protected mutateToSatisfiabilityAssertion(a: SatisfiabilityAssertionTest) { }

	protected mutateToTest(t: Test) { } // Not implemented yet, very HARD.

	protected mutateToVaccuity() {
		this.mutant.forEach(
			(p) => {
				p.body = "";
			}
		);
	}

	///////////////////////////////////////////////////////////////////////////////


	// TODO: Make this better. This is far too verbose, and is from
	// the original implementation.
	protected exampleToPredicate(e: Example): HydratedPredicate {

		const exampleName = e.name;
		const exampleBody = get_text_from_block(e.bounds, this.source_text);

		// Now bounds have two components:
		// Assignments and expressions

		// We need to put ALL the assignments on sigs on the outside, and then expressions and relations inside.
		/*
			some disj ${atom_rhs_comma_sep} : ${atom_name} | {
				${atom_name} = ${atom_rhs}
					.... etc
				expressions
				relations
			}
		*/
		// TODO: ISSUE: What if the example has a some disj quantifier in its body? That would break this.


		function extractAssignments() {

			function assignmentContinued(x: string) {
				let t = x.replace(/\(/g, "").replace(/\)/g, "")
					.replace(/\{/g, "").replace(/\}/g, "").trim();
				return t.startsWith("`") || t.startsWith("->") || t.startsWith(",") || t.startsWith("+");
			}


			const lines = exampleBody.split('\n');
			let expressions: string[] = [];
			let assignments: Object[] = [];

			let currentAssignment = { variable: '', value: '' };
			let isAssignmentContinued = false;

			for (var l of lines) {
				var line = l.trim();
				if (line == '') {
					continue
				}

				isAssignmentContinued = assignmentContinued(line);
				if (isAssignmentContinued) {
					currentAssignment.value += ' ' + line.trim();
				} else {
					assignments.push({ ...currentAssignment });
					if (/^\s*\w+\s*=/.test(line)) {
						let parts = line.split('=');
						const lhs = parts[0].trim();
						const rhs = parts[1].trim();
						currentAssignment = { variable: lhs, value: rhs };
						isAssignmentContinued = true;
					} else {
						expressions.push(line);
					}
				}
			};


			if (isAssignmentContinued) {
				assignments.push({ ...currentAssignment });
			}
			return [assignments, expressions];
		}




		let sigNames = this.full_source_util.getSigs().map((s: Sig) => s.name);

		function sigToExpr(assignment) {
			const atom_name = assignment.variable;
			var atom_rhs = assignment.value.replace(/`/g, '');
			const atom_rhs_list = atom_rhs
				.replace(/\s+|\n|\r/g, '') // Replace all whitespace, newline, or return with empty string
				.replace(/\+/g, ' ')
				.replace(/->/g, ' ')
				.split(' ').map(item => item.trim());

			// Remove any elements that are in sigNames
			const atom_rhs_set = new Set(atom_rhs_list.filter(item => !sigNames.includes(item)));
			// Remove any duplicates
			const atom_rhs_comma_sep = Array.from(atom_rhs_set).join(', ');

			var quantifier = "";
			var constraint = "";
			if (atom_rhs_comma_sep != '') {
				quantifier = sigNames.includes(atom_name) ? `some disj ${atom_rhs_comma_sep} : ${atom_name} | {\n` : '';
				constraint = `${atom_name} = ${atom_rhs}`;
			}

			return {
				quantifier,
				constraint
			};
		}


		const [assignments, expressions] = extractAssignments();

		// All the expressions go on the outside.
		const expressionString = expressions.join('\n');
		const sigExpressions = assignments.map(sigToExpr);
		const sigQuantifiers = sigExpressions.map(a => a.quantifier).filter(a => a != '');
		const sigQuantifiersAsString = sigQuantifiers.join("\n");
		const sigConstraints = sigExpressions.map(a => a.constraint).join("\n");
		const sigAssignmentsPostfix = '}'.repeat(sigQuantifiers.length) + "\n";



		const pred_body = `
		${sigQuantifiersAsString}
		${sigConstraints}
		${expressionString}
		${sigAssignmentsPostfix}
	`;

		return new HydratedPredicate(e.name, {}, pred_body);
	}
}

