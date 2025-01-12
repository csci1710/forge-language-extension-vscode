import { get } from 'http';
import { example_regex, assertion_regex, quantified_assertion_regex, } from './forge-utilities';
import { test_regex, getFailingTestData } from './forge-utilities';


import {
	ForgeUtil,
	Block, SyntaxNode,
	Sig, Predicate, Function,
	Test, AssertionTest, QuantifiedAssertionTest, Example, SatisfiabilityAssertionTest,
	ConsistencyAssertionTest, Expr,
	Formula
} from "forge-toadus-parser";


const negationRegex = /(not|!)\s*(\b\w+\b)/;



class SkippedTest {
	constructor(public test: string, public reason: string) { }
}


// TODO: These feel like something I should be able to get AWAY from using.
function isAssertionTest(t: any): t is AssertionTest {
	return t && typeof t === 'object' && 
			'prop' in t && 'pred' in t 
			&& !(t as QuantifiedAssertionTest).quantifier
			&& !(t as ConsistencyAssertionTest).consistent;
}

function isQuantifiedAssertionTest(t: any): t is QuantifiedAssertionTest {
	return t && typeof t === 'object' && 'prop' in t && 'pred' in t && 'quantifier' in t;
}

function isExample(t: any): t is Example {
	return t && (typeof t === 'object') && ('testExpr' in t);
}

function isConsistencyAssertionTest(t: any): t is ConsistencyAssertionTest {
	return t && (typeof t === 'object') && ('consistent' in t);
}


function getExprFromBracesIfAny(s: string): string {

	let scleaned = s.trim();
	if (scleaned.startsWith("{") && scleaned.endsWith("}")) {
		return scleaned.substring(1, scleaned.length - 1);
	}
	return scleaned;
}


// TODO: Check how params get constructed here!
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

/*
    Row numbers are 1-indexed.
    Column numbers are 0-indexed.
*/
function get_text_block(fromRow: number, toRow: number, fromColumn: number, toColumn: number, text: string): string {
    let lines = text.split("\n");
    let block = "";
    const sameRow = fromRow == toRow;

    for (let i = fromRow; i <= toRow; i++) {
        let line = lines[i - 1]; // Row numbers are 1-indexed, so adjust by subtracting 1

        if (i == fromRow) {
            if (sameRow) {
                // If the block is within the same row, take the substring from fromColumn to toColumn
                block += line.substring(fromColumn, toColumn);
            } else {
                // If the block spans multiple rows, take the substring from fromColumn to the end of the line
                block += line.substring(fromColumn);
            }
        } else if (i == toRow) {
            // For the last row, take the substring from the start of the line to toColumn
            block += line.substring(0, toColumn);
        } else {
            // For rows in between, take the whole line
            block += line;
        }

        // Add a newline character if it's not the last row
        if (i < toRow) {
            block += "\n";
        }
    }

    return block;
}


function get_text_from_syntaxnode(b: SyntaxNode, text: string): string {

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
	skipped_tests: SkippedTest[];
	inconsistent_tests: string[];
	num_mutations: number = 0;

	wheat_util: ForgeUtil;
	//student_util: ForgeUtil;
	full_source_util: ForgeUtil;

	mutant: HydratedPredicate[] = [];

	// ALSO HAVE TO THINK ABOUT THE FUNCTIONS.

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
		//this.student_util = new ForgeUtil(student_tests);
		this.full_source_util = new ForgeUtil(source_text);

		this.wheat_util.processSpec();
		//this.student_util.processSpec();
		this.full_source_util.processSpec();
		this.inconsistent_tests = [];
		this.skipped_tests = [];





		// TODO: Maybe this should keep track of the passing and failing tests rather than the calling code.

		function predicateToHydratedPredicate(p: Predicate): HydratedPredicate {
			let name = p.name;
			let body_block: Block = p.body;


			let body = get_text_from_syntaxnode(body_block, source_text);
			let params_text = get_text_from_syntaxnode(p.params, source_text);

			// If the first character of params is '[' and the last character is ']',
			// we should remove the brackets.
			// This is hacky and I chalk it up to BAD parsing.
			if (params_text.startsWith("[") && params_text.endsWith("]")) {
				params_text = params_text.substring(1, params_text.length - 1);
			}


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
		let consistencyAssertions = this.full_source_util.getConsistencyAssertions();

		// TODO: Here we have to also think about the test expects. Deal with that later.

		for (let e of examples) {
			if (this.isTestOfInclusion(e)) {
				this.mutateAwayExample(e);
			}
		}

		for (let a of assertions) {
			if (this.isTestOfInclusion(a)) {

				// So the assertion is:
				// e implies p
				// So we want to exclude e from p.
				let pred = a.pred;
				let exp = get_text_from_syntaxnode(a.prop, this.source_text);
				this.constrainPredicateByExclusion(pred, exp);
			}
		}

		for (let qa of quantifiedAssertions) {
			if (this.isTestOfInclusion(qa)) {

				let pred = qa.pred;
				let exp = get_text_from_syntaxnode(qa.prop, this.source_text);
				let pred_args = this.getPredArgs(qa.predArgs);
				const quantifier = "all";
				const quantDecls = get_text_from_syntaxnode(qa.quantDecls, this.source_text);
				const disj = (qa.disj) ? "disj" : "";
				const quantifiedPrefix = `${quantifier} ${disj} ${quantDecls} | `;
				this.constrainPredicateByExclusion(pred, exp, quantifiedPrefix, pred_args);
			}
		}

		for (let ca of consistencyAssertions) {
			if (this.isTestOfInclusion(ca)) {

				let pred = ca.pred;
				let exp = get_text_from_syntaxnode(ca.prop, this.source_text);

				this.constrainPredicateByExclusion(pred, exp);
			}
		}

		return this.num_mutations;
	}


	/**
	 * Generates a mutant consistent with *all* tests of exclusion.
	 * @returns 
	 */
	public mutatefromExclusionTestIntersection(): number {

		// First mutate to vaccuity.
		this.mutateToVaccuity();

		let assertions = this.full_source_util.getAssertions();
		let quantifiedAssertions = this.full_source_util.getQuantifiedAssertions();
		let examples = this.full_source_util.getExamples();
		let consistencyAssertions = this.full_source_util.getConsistencyAssertions();

		// TODO: Here we have to also think about the test expects. Deal with that later.

		for (let e of examples) {
			if (this.isTestOfExclusion(e)) {
				// Ensure the mutant does not accept the example.
				this.mutateAwayExample(e);
			}
		}

		for (let a of assertions) {
			if (this.isTestOfExclusion(a)) {

				// THIS HAS TO CHANGE

				// Build the predicate under test from the assertion.
				let pred = a.pred;
				let exp = get_text_from_syntaxnode(a.prop, this.source_text);

				// If it is a test of exclusion, then we know it is
				// exp is necessary for <pred>
				// So we want to 
				this.constrainPredicateByInclusion(pred, exp);
			}
		}

		for (let qa of quantifiedAssertions) {
			if (this.isTestOfExclusion(qa)) {

				let pred = qa.pred;
				let exp = get_text_from_syntaxnode(qa.prop, this.source_text);
				let pred_args = this.getPredArgs(qa.predArgs);

				const quantifier = "all";
				const quantDecls = get_text_from_syntaxnode(qa.quantDecls, this.source_text);
				const disj = (qa.disj) ? "disj" : "";
				const quantifiedPrefix = `${quantifier} ${disj} ${quantDecls} | `;

				this.constrainPredicateByInclusion(pred, exp, quantifiedPrefix, pred_args);

			}
		}

		for (let ca of consistencyAssertions) {
			if (this.isTestOfExclusion(ca)) {
				// So we want to MUTATE TO the consistency assertion.
				let pred = ca.pred;
				let exp = get_text_from_syntaxnode(ca.prop, this.source_text);
				this.constrainPredicateByExclusion(pred, exp); // Exclude exp from pred.
			}
		}

		return this.num_mutations;
	}


	/**
	 * Modifies the mutant so that it passes failing tests.
	 * @returns The number of mutations carried out.
	 */
	public mutateToFailingTests(): number {

		let w_os = this.forge_output.split("\n");
		for (let w_o of w_os) {

			const testData = getFailingTestData(w_o);

			if (testData == undefined) {
				continue;
			}

			const testName = testData.name;
			const testType = testData.type;

			if (testType == "example") {
				let e = this.getExampleByName(testName);
				if (e == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				this.mutateToExample(e);
			}
			else if (testType == "quantified_assertion") {
				let start_row = testData.startRow;
				let start_col = testData.startCol;

				const a = this.getQuantifiedAssertion(start_row, start_col);
				if (a == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				this.mutateToQuantifiedAssertion(a);
			}
			else if (testType == "assertion") {

				let start_row = testData.startRow;
				let start_col = testData.startCol;
				const a = this.getAssertion(start_row, start_col);
				if (a == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				this.mutateToAssertion(a);
			}
			else if (testType == "consistency_assertion") {
				let start_row = testData.startRow;
				let start_col = testData.startCol;
				const a = this.getConsistencyAssertion(start_row, start_col);
				if (a == null) {
					this.skipped_tests.push(new SkippedTest(testName, `Could not find in source.`));
					continue;
				}
				this.mutateToConsistencyAssertion(a);
			}
			else if (testType == "satisfiability_assertion") {
				this.skipped_tests.push(new SkippedTest(testName, `Cannot analyze sat/unsat assertions.`));
			}
			else if (testType == "test-expect") {
				this.skipped_tests.push(new SkippedTest(testName, `Cannot analyze test expects.`));
			}
			else if (testName != "") {
				this.skipped_tests.push(new SkippedTest(testName, `Unsupported test type.`));
			}
		}
		return this.num_mutations;
	}


	///////// TODO THE FUNTIONS ABOVE NEED TO BE REWRITTEN FOR THE NEW FORGE ////

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
			let body = get_text_from_syntaxnode(s, this.source_text);

			return body;
		});

		return sigStrings;


	}



	private getExampleByName(name: string): Example {

		let examples = this.full_source_util.getExamples();
		for (let e of examples) {
			if (e.name == name) {
				return e;
			}
		}
		return null;
	}

	private getAssertion(start_row: number, start_col: number): AssertionTest {
		let assertions = this.full_source_util.getAssertions();
		for (let a of assertions) {
			// I think this is enough to uniquely identify the assertion.
			if (a.startRow == start_row && a.startColumn == start_col)
				return a;
		}
		return null;
	}


	private getQuantifiedAssertion(start_row: number, start_col: number): QuantifiedAssertionTest {
		let assertions: QuantifiedAssertionTest[] = this.full_source_util.getQuantifiedAssertions();
		for (let a of assertions) {

			// I think this is enough to uniquely identify the assertion.
			if (a.startRow == start_row && a.startColumn == start_col)
				return a;


		}
		return null;
	}

	private getConsistencyAssertion(start_row: number, start_col: number): ConsistencyAssertionTest {
		let assertions = this.full_source_util.getConsistencyAssertions();
		for (let a of assertions) {
			// I think this is enough to uniquely identify the assertion.
			if (a.startRow == start_row && a.startColumn == start_col)
				return a;
		}
		return null;
	}

	private getSatisfactionAssertion(start_row: number, start_col: number): SatisfiabilityAssertionTest {
		let assertions = this.full_source_util.getSatisfactionAssertions();
		for (let a of assertions) {
			// I think this is enough to uniquely identify the assertion.
			if (a.startRow == start_row && a.startColumn == start_col)
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


	private getNewName(name: string) {

		return `${name}_inner_${this.num_mutations}`;
	}

	///////// OPERATORS THAT EASE OR CONSTRAINT PREDICATES BY AN EXPRESSION ////////////////
	protected easePredicate(i: string, e: string, quantified_prefix: string = "", pred_args = ""): void {
		let p_i: HydratedPredicate = this.mutant.find((p) => p.name == i);

		if (!p_i) {
			throw new Error(`Predicate ${i} not found! Something is very wrong, please contact the instructor.`);
		}
		this.num_mutations++;
		const newName_i = this.getNewName(i);
		p_i.name = newName_i;
		let new_i_body = `${quantified_prefix} (${newName_i}${pred_args} or (${e}))`;

		let p_i_prime = new HydratedPredicate(i, p_i.params, new_i_body);
		this.mutant.push(p_i_prime);

	}


	protected constrainPredicateByInclusion(i: string, e: string, quantified_prefix: string = "", pred_args = ""): void {
		let p_i: HydratedPredicate = this.mutant.find((p) => p.name == i);
				this.num_mutations++;
		if (!p_i) {
			throw new Error(`Predicate ${i} not found! Something went wrong, please contact the instructor.`);
		}
		this.num_mutations++;
		const newName_i = this.getNewName(i);

		p_i.name = newName_i;
		let new_i_body = `${quantified_prefix} (${newName_i}${pred_args} and (${e}))`;
		let p_i_prime = new HydratedPredicate(i, p_i.params, new_i_body);
		this.mutant.push(p_i_prime);
	}

	protected constrainPredicateByExclusion(i: string, e: string, quantified_prefix: string = "", pred_args = ""): void {

		let p_i: HydratedPredicate = this.mutant.find((p) => p.name == i);

		if (!p_i) {
			throw new Error(`Predicate ${i} not found! Something is very wrong, please contact the instructor.`);
		}
		this.num_mutations++;
		const newName_i = this.getNewName(i);
		p_i.name = newName_i;

		let new_i_body = `${quantified_prefix} (${newName_i}${pred_args} and (not  (${e})))`;
		let p_i_prime = new HydratedPredicate(i, p_i.params, new_i_body);
		this.mutant.push(p_i_prime);
	}



	/////////////////// MUTATION OPERATIONS TO CONSISTENCY ////////////////////////////////

	protected mutateToAssertion(a: AssertionTest) {
		let pred = a.pred;
		let exp = get_text_from_syntaxnode(a.prop, this.source_text);
		let rel = a.check;

		let test_name = `${rel}_assertion_for_${pred}[${a.startRow}:${a.startColumn}]`;
		if (!this.isInstructorAuthored(pred)) {
			this.skipped_tests.push(new SkippedTest(test_name, `Assertion does not directly test a predicate from the assignment statement.`));
			return;
		}

		this.inconsistent_tests.push(test_name);

		if (rel === "necessary") {
			this.constrainPredicateByInclusion(pred, exp);
		}
		else {
			this.easePredicate(pred, exp);
		}
	}

	protected mutateToQuantifiedAssertion(a: QuantifiedAssertionTest) {
		let pred = a.pred;
		let rel = a.check;
		let disj = (a.disj) ? "disj" : "";

		let test_name = `${rel}_quantified_assertion_for_${pred}[${a.startRow}:${a.startColumn}]`;

		if (!this.isInstructorAuthored(pred)) {
			this.skipped_tests.push(new SkippedTest(test_name, `Assertion does not directly test a predicate from the assignment statement.`));
			return;
		}

		let exp = get_text_from_syntaxnode(a.prop, this.source_text);
		const pred_args = this.getPredArgs(a.predArgs); 
		const quantifier = "all";
		const quantDecls = get_text_from_syntaxnode(a.quantDecls, this.source_text);
		const quantifiedPrefix = `${quantifier} ${disj} ${quantDecls} | `;

		this.inconsistent_tests.push(test_name);
		if (rel === "necessary") {
			this.constrainPredicateByInclusion(pred, exp, quantifiedPrefix, pred_args);
		}
		else {
			this.easePredicate(pred, exp, quantifiedPrefix, pred_args);
		}
	}

	// TODO: Very much not sure how this works.
	protected mutateToExample(e: Example) {

		// TODO: We should get this from isTestOfInclusion / isTestOfExclusion


		// Determine if positive or negative example.
		// Find if testExpr
		let exampletestExpr = getExprFromBracesIfAny(get_text_from_syntaxnode(e.testExpr, this.source_text));
		let negativeExample = exampletestExpr.match(negationRegex);

		// Pred under test
		let p_i = exampletestExpr;
		if (negativeExample) {
			p_i = negativeExample[2];
		}

		// Ensure p_i is in the wheat.
		if (!this.isInstructorAuthored(p_i)) {
			this.skipped_tests.push(new SkippedTest(e.name, `Example does not directly test a predicate (or its negation) from the assignment statement.`));
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

	protected mutateToConsistencyAssertion(a: ConsistencyAssertionTest) {

		let pred = a.pred;
		let exp = get_text_from_syntaxnode(a.prop, this.source_text);
		let isConsistent: boolean = a.consistent;
		let consistency_prefix = isConsistent ? "consistent" : "inconsistent"

		let test_name = `${consistency_prefix}_assertion_for_${pred}[${a.startRow}:${a.startColumn}]`;
		if (!this.isInstructorAuthored(pred)) {
			this.skipped_tests.push(new SkippedTest(a.name, `Assertion does not directly test a predicate from the assignment statement.`));
			return;
		}

		this.inconsistent_tests.push(test_name);
		// If isconsistent, then they believe pred & exp is SAT.
		// SO WE need to EASE the predicate to ALLOW the expression.
		if (isConsistent) {
			this.easePredicate(pred, exp);
		}
		// If inconsistent, then they believe pred & exp is can never be SAT.
		// SO WE need to CONSTRAIN the predicate to EXCLUDE the expression.
		else {
			this.constrainPredicateByExclusion(pred, exp);
		}



	}

	private mutateToSatisfiabilityAssertion(a: SatisfiabilityAssertionTest) {
		/// How would this even work?
		throw new Error("Not implemented.");
	}


	private mutateToTest(t: Test) {
		throw new Error("Not implemented yet.");
	} // Not implemented yet, very HARD.

	public mutateToVaccuity() {
		this.mutant.forEach(
			(p) => {
				p.body = "";
			}
		);
	}


	////////////////// MUTATION OPERATIONS TO INCONSISTENCY /////////////////////////////////////
	// TODO: This is a very naive implementation. We should be able to do better.
	protected mutateAwayExample(e: Example) {

		// BUT ONLY IF THIS IS A POSITIVE EXAMPLE.

		let p = this.exampleToPredicate(e);
		this.mutant.push(p);

		// Now, we want to exclude this assertion from rhs.
		this.constrainPredicateByExclusion(e.name, p.name);



		// AND IF IT IS A NEGATIVE EXAMPLE?
		// WE COULD EASE THE PREDICATE TO INCLUDE THE NEGATION OF THE EXAMPLE.

	}



	public get_skipped_tests_as_string(): string {
		let skipped_test_strings = this.skipped_tests.map((s) => {
			return `${s.test} : ${s.reason}`;
		});
		return skipped_test_strings.join("\n");
	}




	///////////////////////////////////////////////////////////////////////////////////


	// TODO: Make this better. This is far too verbose, and is from the original Toadus.
	// As a result, this may not work with all example types.
	protected exampleToPredicate(e: Example): HydratedPredicate {

		const exampleName = e.name;
		const exampleBody = get_text_from_syntaxnode(e.bounds, this.source_text);

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

		// If NOT instructor authored, then it is NOT a test of inclusion.
		if (isAssertionTest(t)) {
			let a = t as AssertionTest;
			let p = a.pred;
			let rel = a.check;
			return this.isInstructorAuthored(p) && (rel === "sufficient");
		} else if (isQuantifiedAssertionTest(t)) {
			let qa = t as QuantifiedAssertionTest;
			let p = qa.pred;
			let rel = qa.check;
			return this.isInstructorAuthored(p) && (rel === "sufficient");
		} else if (isExample(t)) {

			let e = t as Example;
			let exampletestExpr = getExprFromBracesIfAny(get_text_from_syntaxnode(e.testExpr, this.source_text));
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
		else if (isConsistencyAssertionTest(t)) {

			let ca = t as ConsistencyAssertionTest;
			let p = ca.pred;
			let isConsistent = ca.consistent;
			return this.isInstructorAuthored(p) && isConsistent;
		}

		return false;
	}

	private isTestOfExclusion(t: AssertionTest | Example | QuantifiedAssertionTest): boolean {

		if (isAssertionTest(t)) {
			let a = t as AssertionTest;
			let p = a.pred;
			let rel = a.check;

			return this.isInstructorAuthored(p) && (rel === "necessary");

		}
		else if (isQuantifiedAssertionTest(t)) {
			let qa = t as QuantifiedAssertionTest;
			let p = qa.pred;
			let rel = qa.check;
			return this.isInstructorAuthored(p) && (rel === "necessary");
		} else if (isExample(t)) {

			let e = t as Example;

			let exampletestExpr = getExprFromBracesIfAny(get_text_from_syntaxnode(e.testExpr, this.source_text));
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
		else if (isConsistencyAssertionTest(t)) {

			let ca = t as ConsistencyAssertionTest;
			let p = ca.pred;
			let isConsistent = ca.consistent;
			return this.isInstructorAuthored(p) && !isConsistent;
		}

		return false;
	}

	
	private getPredArgs(predArgs : SyntaxNode | undefined) : string {
		if (!predArgs) {
			return "";
		}

		return '[' + get_text_from_syntaxnode(predArgs, this.source_text) + ']'
	}
}

