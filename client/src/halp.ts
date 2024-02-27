import { RacketProcess } from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { removeForgeComments, getFailingTestNames, getFailingTestName } from './forge-utilities';
import { Mutator } from './mutator';
import { LogLevel, Logger, Event } from './logger';
import { SymmetricEncryptor } from './encryption-util';
import * as os from 'os';
import { tempFile } from './gen-utilities';




export function combineTestsWithModel(wheatText: string, tests: string): string {
	// todo: What if separator doesn't exist (in that case, look for #lang forge)
	const TEST_SEPARATOR = "//// Do not edit anything above this line ////"
	const hashlang_decl = "#lang";

	if (tests.includes(TEST_SEPARATOR)) {
		const startIndex = tests.indexOf(TEST_SEPARATOR) + TEST_SEPARATOR.length;
		tests = tests.substring(startIndex).trim();
	}

	tests = tests.replace(hashlang_decl, "// #lang");

	var combined = wheatText + "\n" + tests;
	combined = removeForgeComments(combined);

	combined = combined.replace(/\t/g, " ");
	combined = combined.replace(/\r/g, " ");
	

	return combined;

}

const NOT_ENABLED_MESSAGE = "Sorry! Toadus Ponens is not available for this assignment. Please contact course staff if you believe this is an error.";

/*
	Potential issues : Name clash between student files and grader files.
*/

export class HalpRunner {

	private SOMETHING_WENT_WRONG = "Something went wrong during Toadus Ponens analysis. While I will still make a best effort to provide useful feedback, consider examining your tests with course staff. You may find it useful to share the the VSCode Error log with them. You can access it as follows: Ctrl-shift-p or cmd-shift-p -> Search Show Logs -> Extension Host";
	static WHEATSTORE = "https://csci1710.github.io/2024/toadusponensfiles";
	logger: Logger;
	encryptor: SymmetricEncryptor = new SymmetricEncryptor();
	forgeOutput: vscode.OutputChannel;

	formurl = "https://forms.gle/t2imxLGNC7Yqpo6GA"


	constructor(logger: Logger, output: vscode.OutputChannel) {
		this.logger = logger;
		this.forgeOutput = output;
	}



	isConsistent(w_o: string): boolean {
		const lines = w_o.split("\n");
		const filteredLines = lines.filter((line) => !line.startsWith("Warning:"));
		return filteredLines.join('').trim().length == 0;
	}



	chooseHint(hint_candidates: string[]): string {

		if (hint_candidates.length == 0) {
			return "";
		}
		return hint_candidates[Math.floor(Math.random() * hint_candidates.length)];
	}




	async runHalp(studentTests: string, testFileName: string): Promise<string> {
		
		studentTests = studentTests.replace(/\r/g, "\n");
		const w = await this.getWheat(testFileName);

		if (w === "") {
			vscode.window.showErrorMessage("Toadus : Network error. Terminating run.");
			return "";
		}
		else if (w === NOT_ENABLED_MESSAGE) {
			vscode.window.showErrorMessage(NOT_ENABLED_MESSAGE);
			return "";
		}

		this.forgeOutput.appendLine('🐸 Step 1: Analyzing your tests...');

		const run_result = await this.runTestsAgainstModel(studentTests, w);

		// TODO: This is hacky
		const w_o = run_result['stderrput'];
		const source_text = run_result['toRun'];
		const mutator = new Mutator(w, studentTests, w_o, testFileName, source_text);

		if (this.isConsistent(w_o)) {
			let thoroughness_candidates = await this.generateThoroughnessFeedback(mutator);
			return this.chooseHint(thoroughness_candidates);
		}


		const testNames = getFailingTestNames(w_o);
		const noTestFound = `I found a runtime or syntax error in your tests:
${w_o}`;

		if (testNames.length == 0) {
			return noTestFound;
		}
		
		try {
			// TODO: Need to access the strategy here!
			var isPerTest = true;
			

			if (isPerTest) {

				let per_test_hints = await this.runPerTestStrategy(w, w_o, studentTests, testFileName, source_text);
				
				// Now need to annotate per test hints with the test name.
				this.forgeOutput.appendLine(`🐸 Step 2: I suspect that the following test(s) may be inconsistent with the problem specification.`);
				this.forgeOutput.appendLine(`Generating feedback around these tests ⌛`);


				let composite_hint = "";
				// Now we need to choose a hint per test. But what about ambiguous tests? This is where it happens?
				for (var test in per_test_hints) {

					var hint = this.chooseHint(per_test_hints[test])
					if (hint == "") {
						hint = this.recordAmbiguousTest(testFileName, studentTests, mutator.forge_output);
					}

					composite_hint += `\n${test} : ${hint}\n`;
				}
				return composite_hint;
			}

			else {
				var hints = await this.runComprehensiveStrategy(mutator, studentTests, testFileName);
				return this.chooseHint(hints);
			}


			
		}
		catch (e) {
			vscode.window.showErrorMessage(this.SOMETHING_WENT_WRONG);
			return this.SOMETHING_WENT_WRONG;
		}
	}


	private async runComprehensiveStrategy(mutator : Mutator, studentTests : string, testFileName : string, ): Promise<string[]> {

			mutator.mutateToStudentMisunderstanding();
			let assessed_tests = mutator.inconsistent_tests.join("\n");
			let skipped_tests = mutator.error_messages.join("\n");
			this.forgeOutput.appendLine(skipped_tests);


			
			this.forgeOutput.appendLine(`🐸 Step 2: I suspect that the following ${mutator.inconsistent_tests.length} test(s) may be inconsistent with the problem specification:\n ${assessed_tests}`);
			this.forgeOutput.appendLine(`Generating feedback around these tests ⌛`);

			try {
				var hints = await this.tryGetHintsFromMutant(testFileName, mutator.mutant, mutator.student_preds, mutator.forge_output);
			}
			catch (e) {
				vscode.window.showErrorMessage(this.SOMETHING_WENT_WRONG);
				this.forgeOutput.appendLine(e.message);
				return [this.SOMETHING_WENT_WRONG];
			}
			
			if (hints.length == 0) {
				// One lost piece of information is that students do not know
				// *which* tests are ambiguous. We lose this granularity with a comprehensive mutation strategy.
				return [this.recordAmbiguousTest(testFileName, studentTests, mutator.forge_output)];
			}
			return hints;

	}

	private async runPerTestStrategy(w : string, w_o : string, studentTests : string, testFileName : string, source_text : string): Promise<Object> {


		let per_test_hints = {}
		let lines = w_o.split("\n");
		
		for (var outputline of lines) {

			const tn = getFailingTestName(outputline);
			if (tn == "") {
				continue;
			}

			const lineMutator = new Mutator(w, studentTests, outputline, testFileName, source_text, 1);
			lineMutator.mutateToStudentMisunderstanding();
			var hints = await this.tryGetHintsFromMutant(testFileName, lineMutator.mutant, lineMutator.student_preds, outputline);
			per_test_hints[tn] = hints;


			/*
				We should do something about the ambiguous tests here


			*/
			
		}

		return per_test_hints;

	}


	recordAmbiguousTest(testFileName: string, studentTests: string, forge_output : string) : string {
		const payload = {

			"studentTests": studentTests,
			"wheat_output": forge_output,
			"testFile": testFileName
		}
		this.logger.log_payload(payload, LogLevel.INFO, Event.AMBIGUOUS_TEST);
		return `Analyzed test(s) examine behaviors that are either ambiguous or not clearly defined in the problem specification.
		They are not necessarily incorrect, but I cannot provide feedback around them. If you disagree with this assessment, and believe that these test(s) do deal with behavior explicitly described in the problem specification,
		please fill out this form: ${this.formurl}`;

	}


	private async runTestsAgainstModel(tests: string, model: string): Promise<Object> {

		const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
		let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, this.forgeOutput);
		const toRun = combineTestsWithModel(model, tests);

		// Write the contents of toRun to a temporary file
		const tempFilePath = tempFile();
		try {
			fs.writeFileSync(tempFilePath, toRun);
			let r = racket.runFile(tempFilePath);

			if (!r) {
				vscode.window.showErrorMessage("Could not run Forge process.");
				console.error("Could not run Forge process.");
				return {stderrput : "Toadus Ponens run failed.", toRun : toRun};
			}

			let stdoutput = "";
			r.stdout.on('data', (data: string) => {
				stdoutput += data;
			});

			let stderrput = "";
			r.stderr.on('data', (err: string) => {
				stderrput += err;
			});


			await new Promise((resolve) => {
				r.on('exit', resolve);
			});
			return {stderrput, toRun};
		} catch (e) {

			vscode.window.showErrorMessage(`Toadus Ponens run failed, perhaps be because VS Code did not have permission to write a file to your OS temp folder (${os.tmpdir()}). Consult the Toadus Ponens guide for how to modify this. Full error message : ${e}`);
		}

		finally {
			// Delete the temporary file in the finally block
			fs.unlinkSync(tempFilePath);
		}
	}


	private async downloadFile(url: string): Promise<string> {

		const response = await fetch(url);
		if (response.ok) {
			const t = await response.text();
			return this.encryptor.decrypt(t);
		}

		this.logger.log_payload({ "url": url }, LogLevel.ERROR, Event.FILE_DOWNLOAD)
		if (response.status === 404) {
			vscode.window.showErrorMessage(NOT_ENABLED_MESSAGE)
			return NOT_ENABLED_MESSAGE;
		}
		else {
			vscode.window.showErrorMessage(`Toadus : Network error ${response.status} ${response.statusText}`);
			return ""; 			// ERROR
		}
	}

	private async getWheat(testFileName: string): Promise<string> {
		const wheatName = path.parse(testFileName.replace('.test.frg', '.wheat')).base;
		const wheatURI = `${HalpRunner.WHEATSTORE}/${wheatName}`;
		const wheat = await this.downloadFile(wheatURI);
		return removeForgeComments(wheat);
	}

	private async getAutograderTests(testFileName: string): Promise<string> {
		const graderName = path.parse(testFileName.replace('.test.frg', '.grader')).base;
		const graderURI = `${HalpRunner.WHEATSTORE}/${graderName}`;
		return await this.downloadFile(graderURI);
	}

	private async getHintMap(testFileName: string): Promise<Object> {
		const graderName = path.parse(testFileName.replace('.test.frg', '.grader.json')).base;
		const graderURI = `${HalpRunner.WHEATSTORE}/${graderName}`;
		const jsonString = await this.downloadFile(graderURI);
		try {
			const jsonObject = JSON.parse(jsonString);
			return jsonObject;
		}
		catch {
			return {};
		}
	}


	private async tryGetHintsFromAutograderOutput(ag_output: string, testFileName: string): Promise<string[]> {

		if (ag_output == "") {
			return [];
		}
		const tNames = getFailingTestNames(ag_output);
		const hint_map = await this.getHintMap(testFileName);

		var issues = tNames.filter((tName) => !(tName in hint_map));
		if (issues.length > 0) {
			vscode.window.showErrorMessage("Something went wrong during Toadus Ponens analysis. While I will still make a best effort to provide useful feedback, consider examining your tests with course staff.");
		}


		var hint_candidates = tNames.filter((tName) => tName in hint_map)
			.map((tName) => hint_map[tName]);
		return hint_candidates;
	}

	async tryGetHintsFromMutant(testFileName: string, mutant: string, student_preds: string, w_o: string): Promise<string[]> {

		const payload = {
			"testFileName": testFileName,
			"assignment": testFileName.replace('.test.frg', ''),
			"student_preds": student_preds,
			"test_failure_message": w_o,
			"conceptual_mutant": mutant
		}
		this.logger.log_payload(payload, LogLevel.INFO, Event.CONCEPTUAL_MUTANT)

		const autograderTests = await this.getAutograderTests(testFileName);
		const ag_meta = await this.runTestsAgainstModel(autograderTests, mutant);
		const ag_output = ag_meta['stderrput'];
		return await this.tryGetHintsFromAutograderOutput(ag_output, testFileName);
	}

	private async tryGetThoroughnessFromAutograderOutput(ag_output: string, testFileName: string): Promise<string[]> {

		const failed_tests = getFailingTestNames(ag_output);
		const hint_map = await this.getHintMap(testFileName);

		const test_names = Object.keys(hint_map);
		let missingTests = test_names.filter(x => !failed_tests.includes(x));
		const hint_candidates = missingTests.map((tName) => hint_map[tName]);
		return hint_candidates;
	}

	async tryGetThoroughnessFromMutant(testFileName: string, mutant: string, student_preds: string): Promise<string[]> {


		const payload = {
			"testFileName": testFileName,
			"assignment": testFileName.replace('.test.frg', ''),
			"student_preds": student_preds,
			"conceptual_mutant": mutant
		}
		this.logger.log_payload(payload, LogLevel.INFO, Event.THOROUGHNESS_MUTANT)

		const autograderTests = await this.getAutograderTests(testFileName);
		const ag_meta = await this.runTestsAgainstModel(autograderTests, mutant);
		const ag_output = ag_meta['stderrput'];
		return await this.tryGetThoroughnessFromAutograderOutput(ag_output, testFileName);
	}

	async generateThoroughnessFeedback(mutator : Mutator) : Promise<string[]> {

		this.forgeOutput.appendLine(`🎉 Your tests are all consistent with the assignment specification! 🎉
		Just because your tests are consistent does not mean they thoroughly explore the problem space.`);
		this.forgeOutput.appendLine(`🐸 Step 2: Asessing the thoroughness of your test-suite. I will ignore ANY tests that are not in 'test-suite's`);

		// Flush the output
		this.forgeOutput.show();

		mutator.mutateToStudentUnderstanding();
		let skipped_tests = mutator.error_messages.join("\n");
		this.forgeOutput.appendLine(skipped_tests);
		// There should be one mutation per considered, consistent test
		this.forgeOutput.appendLine(`🐸 Step 3: Generating a hint to help you improve test thoroughness, with the remaining ${mutator.num_mutations} tests in mind. ⌛\n`);
		this.forgeOutput.show();
		try {
			let thoroughness_hints = await this.tryGetThoroughnessFromMutant(mutator.test_file_name, mutator.mutant, mutator.student_preds);
			if (thoroughness_hints.length == 0) {
				return ["I could not generate a hint. It's important to remember that this doesn't automatically mean the tests are exhaustive or explore every aspect of the problem."]
			}
			return thoroughness_hints;
		}
		catch (e) {
			vscode.window.showErrorMessage(this.SOMETHING_WENT_WRONG);
			this.forgeOutput.appendLine(e.message);
			return [this.SOMETHING_WENT_WRONG];
		}
	}

}