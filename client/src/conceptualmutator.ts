import { example_regex, assertion_regex, quantified_assertion_regex, } from './forge-utilities';
import { test_regex, getFailingTestName } from './forge-utilities';
import { window } from 'vscode';


import {
	ForgeUtil,
	Block,
	Sig, Predicate, Function,
	Test, AssertionTest, QuantifiedAssertionTest, Example, SatisfiabilityAssertionTest,
	Formula, Expr
} from "forge-toadus-parser";


const negationRegex = /(not|!)\s*(\b\w+\b)/;



class SkippedTest {
	constructor(public test: string, public reason: string) { }
}



// TODO: These feel like something I should be able to get 
// AWAY from using.
function isAssertionTest(t: any): t is AssertionTest {
	return t && typeof t === 'object' && 'prop' in t && 'pred' in t && !(t as QuantifiedAssertionTest).quantifier;
}

function isQuantifiedAssertionTest(t: any): t is QuantifiedAssertionTest {
	return t && typeof t === 'object' && 'prop' in t && 'pred' in t && 'quantifier' in t;
}

function isExample(t: any): t is Example {
	return t && (typeof t === 'object') && ('testExpr' in t);
}


function getExprFromBracesIfAny(s: string): string {

	let scleaned = s.trim();
	if (scleaned.startsWith("{") && scleaned.endsWith("}")) {
		return scleaned.substring(1, scleaned.length - 1);
	}
	return scleaned;
}


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


function get_text_block(fromRow: number, toRow: number, fromColumn: number, toColumn: number, text: string): string {
	let lines = text.split("\n");
	let block = "";
	const sameRow = fromRow == toRow;
	for (let i = fromRow; i <= toRow; i++) {
		let line = lines[i - 1];
		if (i == fromRow) {
			if(sameRow) {
				block += line.substring(fromColumn - 1, toColumn + 1);
			}
			else {
				block += line.substring(fromColumn - 1);
			}
		} else if (i == toRow) {
			block += line.substring(0, toColumn + 1); // DO WE NEED TO ADD 1?
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

	let fromRow = b.startRow;
	let toRow = b.endRow;
	let fromColumn = b.startColumn;
	let toColumn = b.endColumn;

	return get_text_block(fromRow, toRow, fromColumn, toColumn, text);
}


/*
	Mutates a Forge ``wheat'' (aka correct solution)
	to generate a mutant that is consistent with the student's
	tests.
*/
export class ConceptualMutator {
	// TODO: Keep track of SKIPPED tests and INCONSISTENT tests.
	skipped_tests: SkippedTest[];
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
		this.inconsistent_tests = [];
		this.skipped_tests = [];

		// TODO: Maybe this should keep track of the passing and
		// failing tests rather than the calling code.



		function predicateToHydratedPredicate(p: Predicate): HydratedPredicate {
			let name = p.name;
			let body_block: Block = p.body;


			let body = get_text_from_block(body_block, source_text);
			let params_text = get_text_from_block(p.params, source_text);

			let params = {};
			let param_strings = params_text.split(",");



			for (let param_string of param_strings) {
				let [name, type] = param_string.split(":");
				if (name && type) {
					params[name.trim()] = type.trim();
				}
			}
			return new HydratedPredicate(name, params, body);
		}

		this.mutant = this.full_source_util.getPreds().map(predicateToHydratedPredicate);
	}


	/**
	 * Mutate to remove belief.
	 * Modifies the mutant so that it fails passing tests of inclusion.
	 */
	public mutateToExcludeInclusionTests(): number {

		let assertions = this.full_source_util.getAssertions();
		let quantifiedAssertions = this.full_source_util.getQuantifiedAssertions();
		let examples = this.full_source_util.getExamples();

		// TODO: Here we have to also think about the test expects. Deal with that later.

		for (let e of examples) {
			if (this.isTestOfInclusion(e)) {
				this.mutateAwayExample(e);
			}
		}

		for (let a of assertions) {
			if (this.isTestOfInclusion(a)) {
				this.mutateAwayAssertion(a);
			}
		}

		for (let qa of quantifiedAssertions) {
			if (this.isTestOfInclusion(qa)) {
				this.mutateAwayQuantifiedAssertion(qa);
			}
		}

		return this.num_mutations;
	}


	/**
	 * TODO: Needs to be implemented.
	 * Generates a mutant consistent with *all* tests of exclusion.
	 * @returns 
	 */
	public mutatefromExclusionTestIntersection(): number {

		// First mutate to vaccuity.
		this.mutateToVaccuity();

		let assertions = this.full_source_util.getAssertions();
		let quantifiedAssertions = this.full_source_util.getQuantifiedAssertions();
		let examples = this.full_source_util.getExamples();

		// TODO: Here we have to also think about the test expects. Deal with that later.

		for (let e of examples) {
			if (this.isTestOfExclusion(e)) {

				// Ensure the mutant does not
				// accept the example.
				this.mutateAwayExample(e);
			}
		}

		for (let a of assertions) {
			if (this.isTestOfExclusion(a)) {

				// Build the predicate under test from the assertion.
				// pred => prop
				let lhs = a.pred;
				let rhs = a.prop;

				// If it is a test of exclusion, then we
				// know that the lhs is from the wheat.
				this.constrainPredicateByInclusion(lhs, rhs);
			}
		}

		for (let qa of quantifiedAssertions) {
			if (this.isTestOfExclusion(qa)) {
				// Build the predicate under test from the quantified assertion.
				let lhs = qa.pred;
				let rhs = qa.prop;
				let rel = qa.check;

				const quantifier = "all";
				const quantDecls = get_text_from_block(qa.quantDecls, this.source_text);
				const disj = (qa.disj) ? "disj" : "";
				const quantifiedPrefix = `${quantifier} ${disj} ${quantDecls} `;

				// If it is a test of exclusion, then we
				// know that the lhs is from the wheat.

				// BUT IS THIS RIGHT? TODO: WHAT ABOUT THE EXACT ARGUMENTS TO EACH PREDICATE?
				// THESE ARE NOT THE CALL PARAMS.


				this.constrainPredicateByInclusion(lhs, rhs, quantifiedPrefix);

			}
		}

		return this.num_mutations;
	}


	/**
	 * Modifies the mutant so that it passes failing tests.
	 * @returns The number of mutations carried out.
	 */
	public mutateToFailingTests(): number {


		// if(test_names.length != 0) {

		// 	const excludingTestMessage = `❗Excluding test "${testName}" from my analysis. 
		// 	This test is EITHER not consistent with the assignment OR tests some behavior not
		// 	explicitly defined in the assignment statement. I cannot determine which of these is the case
		// 	because of the format of the test.`;

		// }

		let w_os = this.forge_output.split("\n");
		for (let w_o of w_os) {
			const testName = getFailingTestName(w_o);
			//const excludingTestMessage = `❗Excluding test "${testName}" from my analysis.`;

			if (example_regex.test(w_o)) {
				let e = this.getExampleByName(testName);
				if (e == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				this.mutateToExample(e);

			} else if (quantified_assertion_regex.test(w_o)) {
				const match = w_o.match(quantified_assertion_regex);
				if (match == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}

				const start_row = parseInt(match[1]);
				const start_col = parseInt(match[2]);
				//const span = parseInt(match[3]);
				//const lhs_pred = match[4];
				const op = match[5];
				//const rhs_pred = match[6];
				const a = this.getQuantifiedAssertion(start_row, start_col, op);
				if (a == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				this.mutateToQuantifiedAssertion(a);
			}
			else if (assertion_regex.test(w_o)) {
				const match = w_o.match(assertion_regex);
				if (match == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				const lhs_pred = match[1];
				const op = match[2];
				const rhs_pred = match[3];
				const a = this.getAssertion(lhs_pred, op, rhs_pred);
				if (a == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				this.mutateToAssertion(a);
			}
			else if (test_regex.test(w_o)) {

				this.skipped_tests.push(new SkippedTest(testName, `Cannot analyze test expects.`));
				continue;
			}
			else if (testName != "") {
				// Could also be a assert is sat/unsat.
				this.skipped_tests.push(new SkippedTest(testName, `Unsupported test type.`));
			}
		}
		return this.num_mutations;
	}


	public getMutantAsString(): string {

		let predStrings = this.mutant.map((p) => {
			let declParams = p.declParams();
			let body = p.body;
			return `pred ${p.name}${declParams}\n {\n ${body} \n}`;
		});

		let PREFIX = "#lang forge\n option run_sterling off\n";
		let sigDecls = this.hydrateSigs();
		let sigs = sigDecls.join("\n\n");


		// TODO: ALSO NEED TO HYDRATE FUNCTIONS.

		let predicates = predStrings.join("\n\n");
		return `${PREFIX}\n${sigs}\n\n${predicates}`;

	}


	/**
	 * Not ideal. This is a low fidelity solution.
	 * @returns A list of sigs as strings.
	 */
	private hydrateSigs(): string[] {

		let sigs: Sig[] = this.full_source_util.getSigs();
		let sigStrings = sigs.map((s) => {
			let name = s.name;

			// I think this is the '' low fidelity '' solution for now.
			let body = get_text_from_block(s, this.source_text);

			return body;
		});

		return sigStrings;


	}



	private getExampleByName(name: string): Example {

		let examples = this.student_util.getExamples();
		for (let e of examples) {
			if (e.name == name) {
				return e;
			}
		}
		return null;
	}

	private getAssertion(lhs: string, op: string, rhs: string): AssertionTest {

		let assertions = this.student_util.getAssertions();
		for (let a of assertions) {
			if (a.check == op) {

				// The assertion construct is always pred => prop
				// But we need to find lhs' sufficient rhs OR rhs is necessary for lhs.
				if (op == "sufficient" && a.pred == lhs && a.prop == rhs) {
					return a;
				}

				if (op == "necessary" && a.pred == rhs && a.prop == lhs) {
					return a;
				}

			}
		}
		return null;


	}


	private getQuantifiedAssertion(start_row: number, start_col: number, op: string): QuantifiedAssertionTest {

		let assertions: QuantifiedAssertionTest[] = this.student_util.getQuantifiedAssertions();
		for (let a of assertions) {

			// I thinkt this is enough to uniquely identify the assertion.
			if (a.startRow == start_row && a.startCol == start_col && a.check == op)
				return a;


		}
		return null;

	}

	private isInstructorAuthored(p: Predicate | string): boolean {

		// if p is a string, then it is the name of the predicate.
		// if p is a Predicate, then it is the predicate itself.
		let pname = (typeof p === "string") ? p : p.name;

		pname = pname.trim();

		let wheat_predicates: Predicate[] = this.wheat_util.getPreds();
		for (let wp of wheat_predicates) {
			if (wp.name == pname) {
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

		let i_callParams = p_i.callParams();
		let s_callParams = p_s.callParams();

		let new_i_body = `${quantified_prefix} (${newName_i}${i_callParams} and ${s}${s_callParams})`;

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
		let i_callParams = p_i.callParams();
		let s_callParams = p_s.callParams();

		let new_i_body = `${quantified_prefix} (${newName_i}${i_callParams} and (not  ${s}${s_callParams}))`;

		let p_i_prime = new HydratedPredicate(i, p_i.params, new_i_body);
		this.mutant.push(p_i_prime);
	}



	/////////////////// MUTATION OPERATIONS TO CONSISTENCY ////////////////////////////////
	protected mutateToAssertion(a: AssertionTest) {

		// TEST IS ALWAYS OF THE FORM pred => prop
		// SO BELIEF IS ALWAYS lhs => rhs
		let lhs = a.pred;
		let rhs = a.prop;
		let rel = a.check;

		let lhs_in_wheat = this.isInstructorAuthored(lhs);
		let rhs_in_wheat = this.isInstructorAuthored(rhs);


		let test_name = (rel === "sufficient") ? `${lhs} is sufficient for ${rhs}` : `${rhs} is necessary for ${lhs}`;
		if (!(this.xor(lhs_in_wheat, rhs_in_wheat))) {
			let reason = (lhs_in_wheat && rhs_in_wheat) ? `Both ${lhs} and ${rhs} are from the assignment statement.` : `Neither ${lhs} nor ${rhs} are from the assignment statement.`;
			this.skipped_tests.push(new SkippedTest(test_name,`${reason}. I can only give feedback around assertions that directly reference exactly one predicate from the assignment statement.`));
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
		let lhs = a.pred;    // TODO: I THINK THIS IS BUGGY (WHAT ABOUT THE PARAMS)
		let rhs = a.prop;	// I THINK THIS IS BUGGY (WHAT ABOUT THE PARAMS)
		let rel = a.check;
		let disj = (a.disj) ? "disj" : "";

		const quantifier = "all";
		const quantDecls = get_text_from_block(a.quantDecls, this.source_text);

		const quantifiedPrefix = `${quantifier} ${disj} ${quantDecls} `;

		let lhs_in_wheat = this.isInstructorAuthored(lhs);
		let rhs_in_wheat = this.isInstructorAuthored(rhs);


		let test_name = (rel === "sufficient") ? `${quantifiedPrefix} ${lhs} is sufficient for ${rhs}` : `${rhs} is necessary for ${lhs}`;

		if (!(this.xor(lhs_in_wheat, rhs_in_wheat))) {
			let reason = (lhs_in_wheat && rhs_in_wheat) ? `Both ${lhs} and ${rhs} are from the assignment statement.` : `Neither ${lhs} nor ${rhs} are from the assignment statement.`;
			this.skipped_tests.push(new SkippedTest(test_name,`${reason}. I can only give feedback around assertions that directly reference exactly one predicate from the assignment statement.`));
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

	// TODO: Very much not sure how this works.
	protected mutateToExample(e: Example) {


		// TODO: We should get this from isTestOfInclusion / isTestOfExclusion


		// Determine if positive or negative example.
		// Find if testExpr
		let exampletestExpr = getExprFromBracesIfAny(get_text_from_block(e.testExpr, this.source_text));
		let negativeExample = exampletestExpr.match(negationRegex);

		// Pred under test
		let p_i = exampletestExpr;
		if (negativeExample) {
			p_i = negativeExample[2];
		}

		// Ensure p_i is in the wheat.
		if (!this.isInstructorAuthored(p_i)) {
			this.skipped_tests.push(new SkippedTest(e.name,`Example does not directly test a predicate (or its negation) from the assignment statement.`));
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

	public mutateToVaccuity() {
		this.mutant.forEach(
			(p) => {
				p.body = "";
			}
		);
	}


	////////////////// MUTATION OPERATIONS TO INCONSISTENCY (AKA REMOVE) /////////////////////////////////////

	/**
	 * 
	 * Excludes the assertions behavior from the mutant.
	 */
	protected mutateAwayAssertion(a: AssertionTest) {

		let lhs = a.pred;
		let rhs = a.prop;
		let rel = a.check;

		// let lhs_in_wheat = this.isInstructorAuthored(lhs);
		// let rhs_in_wheat = this.isInstructorAuthored(rhs);

		// if (!(this.xor(lhs_in_wheat, rhs_in_wheat))) {
		// 	this.error_messages.push(`❗Excluding assert ${lhs} ${rel} ${rhs} from analysis. I can only give feedback around assertions that directly reference exactly one predicate from the assignment statement.`);
		// 	return;
		// }
		// else if (!rhs_in_wheat) {
		// 	// Ideally we only want to mutate away assertions of inclusion ( that is s => i),
		// 	// since otherwise we would be UNSAT.

		// 	// BUT WE HOPE THAT THIS IS DEALT WITH BY THE CALLING FUNCTION.

		// 	// JUST KNOW THAT THIS IS A WARNING.
		// }


		const assertionAsExpr = `${lhs} implies ${rhs}`;
		const predicateName = this.randomNameGenerator();

		let new_mutation_predicate = new HydratedPredicate(predicateName, {}, assertionAsExpr);

		this.mutant.push(new_mutation_predicate);

		// Now, we want to exclude this assertion from rhs.
		this.constrainPredicateByExclusion(rhs, predicateName);


	}


	protected mutateAwayQuantifiedAssertion(a: QuantifiedAssertionTest) {

		// TODO: I THINK THIS IS BUGGY.
		let lhs = a.pred; // // TODO: I THINK THIS IS BUGGY (WHAT ABOUT THE PARAMS)
		let rhs = a.prop;// TODO: I THINK THIS IS BUGGY (WHAT ABOUT THE PARAMS)
		let rel = a.check;



		const quantifier = "all";
		const quantDecls = get_text_from_block(a.quantDecls, this.source_text);
		const disj = (a.disj) ? "disj" : "";
		const quantifiedPrefix = `${quantifier} ${disj} ${quantDecls} `;


		const quantifiedAssertionAsExpr = `${quantifiedPrefix} (${lhs} implies ${rhs})`;
		const predicateName = this.randomNameGenerator();
		let new_mutation_predicate = new HydratedPredicate(predicateName, {}, quantifiedAssertionAsExpr);
		this.mutant.push(new_mutation_predicate);

		// Now, we want to exclude this assertion from rhs.
		this.constrainPredicateByExclusion(rhs, predicateName);

	}




	protected mutateAwayExample(e: Example) {

		// BUT ONLY IF THIS IS A POSITIVE EXAMPLE.

		let p = this.exampleToPredicate(e);
		this.mutant.push(p);

		// Now, we want to exclude this assertion from rhs.
		this.constrainPredicateByExclusion(e.name, p.name);



		// AND IF IT IS A NEGATIVE EXAMPLE?
		// WE COULD EASE THE PREDICATE TO INCLUDE THE NEGATION OF THE EXAMPLE.

	}








	///////////////////////////////////////////////////////////////////////////////////


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



	private isTestOfInclusion(t: AssertionTest | Example | QuantifiedAssertionTest): boolean {

		if (isAssertionTest(t)) {

			let a = t as AssertionTest;
			let rhs = a.prop;
			let lhs = a.pred;
			return this.isInstructorAuthored(rhs) && !this.isInstructorAuthored(lhs);

		} else if (isQuantifiedAssertionTest(t)) {

			let qa = t as QuantifiedAssertionTest;

			let rhs = qa.prop;
			let lhs = qa.pred;
			return this.isInstructorAuthored(rhs) && !this.isInstructorAuthored(lhs);
		} else if (isExample(t)) {

			let e = t as Example;
			let exampletestExpr = getExprFromBracesIfAny(get_text_from_block(e.testExpr, this.source_text));
			let negativeExample = exampletestExpr.match(negationRegex);

			// Pred under test
			let p_i = exampletestExpr;
			if (negativeExample) {
				p_i = negativeExample[2];
			}

			// Ensure p_i is in the wheat.
			if (!this.isInstructorAuthored(p_i)) {
				return false;
			}

			// If it is a positive example, then it is a test of inclusion.
			return !negativeExample;
		}

		return false;
	}

	private isTestOfExclusion(t: AssertionTest | Example | QuantifiedAssertionTest): boolean {

		if (isAssertionTest(t)) {
			let a = t as AssertionTest;
			let rhs = a.prop;
			let lhs = a.pred;
			return !this.isInstructorAuthored(rhs) && this.isInstructorAuthored(lhs);
		}
		else if (isQuantifiedAssertionTest(t)) {

			let qa = t as QuantifiedAssertionTest;
			let rhs = qa.prop;
			let lhs = qa.pred;
			return !this.isInstructorAuthored(rhs) && this.isInstructorAuthored(lhs);
		} else if (isExample(t)) {

			let e = t as Example;

			let exampletestExpr = getExprFromBracesIfAny(get_text_from_block(e.testExpr, this.source_text));
			let negativeExample = exampletestExpr.match(negationRegex);

			// Pred under test
			let p_i = exampletestExpr;
			if (negativeExample) {
				p_i = negativeExample[2];
			}

			// Ensure p_i is in the wheat.
			if (this.isInstructorAuthored(p_i) && negativeExample) {
				return true;
			}
		}

		return false;
	}

	private randomNameGenerator(): string {
		// Generates a random predicate name starting with p and then 5 random characters.
		let randomName = 'generated_' + Math.random().toString(36).substring(2, 7);
		return randomName;
	}
}

