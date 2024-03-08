import { RacketProcess } from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { removeForgeComments, getFailingTestNames, getFailingTestName, combineTestsWithModel } from './forge-utilities';
import { Mutator } from './mutator';
import { LogLevel, Logger, Event } from './logger';
import { SymmetricEncryptor } from './encryption-util';
import * as os from 'os';
import { tempFile } from './gen-utilities';

export class RunResult {

	constructor(stderr: string = "", stdout: string = "", runsource: string = "") {
		this.stderr = stderr;
		this.stdout = stdout;
		this.runsource = runsource;
	}
	stderr: string;
	stdout: string;
	runsource: string;
}

// The maximum number of hints to display to the user for a single run.
const MAX_HINT = 3;

const NOT_ENABLED_MESSAGE = "Sorry! Toadus Ponens is not available for this assignment. Please contact course staff if you believe this is an error.";
const CONSISTENCY_MESSAGE = `🎉 Your tests are all consistent with the assignment specification! 🎉 Just because your tests are consistent, however, does not mean they thoroughly explore the problem space.`

export class HalpRunner {

	private SOMETHING_WENT_WRONG = "Something went wrong during Toadus Ponens analysis. While I will still make a best effort to provide useful feedback, consider examining your tests with course staff. You may find it useful to share the the VSCode Error log with them. You can access it as follows: Ctrl-shift-p or cmd-shift-p -> Search Show Logs -> Extension Host";
	static WHEATSTORE = "https://csci1710.github.io/2024/toadusponensfiles";
	logger: Logger;
	encryptor: SymmetricEncryptor = new SymmetricEncryptor();
	forgeOutput: vscode.OutputChannel;

	formurl = "https://forms.gle/t2imxLGNC7Yqpo6GA"

	mutationStrategy : string;
	thoroughnessEnabled : boolean;


	constructor(logger: Logger, output: vscode.OutputChannel) {
		this.logger = logger;
		this.forgeOutput = output;

		let currentSettings = vscode.workspace.getConfiguration('forge');
		this.mutationStrategy = String(currentSettings.get('feedbackStrategy'));
		this.thoroughnessEnabled = Boolean(currentSettings.get('thoroughnessFeedbackEnabled'));
	}



	isConsistent(w_o: string): boolean {
		const lines = w_o.split("\n");
		const filteredLines = lines.filter((line) => !line.startsWith("Warning:"));
		return filteredLines.join('').trim().length == 0;
	}


	chooseN(arr: any[], n : number): any[] {
		const randomElements : any[] = [];
		const maxElements = Math.min(arr.length, n);
		for (let i = 0; i < maxElements; i++) {
			const randomIndex = Math.floor(Math.random() * arr.length);
			randomElements.push(arr[randomIndex]);
			arr.splice(randomIndex, 1);
		}
		return randomElements;
	}


	generateHintFromCandidates(hint_candidates: string[]): string {

		if (hint_candidates.length == 0) {
			return "";
		}

		const chosen_hints = this.chooseN(hint_candidates, MAX_HINT)
								.map(hint => `🐸💡 ${hint}`)
								.join("\n");

		return chosen_hints;
	}


	generateThoroughnessFeedbackFromCandidates(thoroughness_hints: string[]): string {
		if (thoroughness_hints.length == 0) {
				return "I could not generate a hint to help evaluate test thoroughness. It's important to remember that this doesn't automatically mean the tests are exhaustive or explore every aspect of the problem.";
		}
		
		const feedback = this.chooseN(thoroughness_hints, MAX_HINT)
								.map(hint => `🐸 🗯️ ${hint}`)
								.join("\n");

		return feedback;
	}

	async runHalp(studentTests: string, testFileName: string): Promise<string> {
		
		this.logger.log_payload({'feedbackstrategy' : this.mutationStrategy }, LogLevel.INFO, Event.ASSISTANCE_REQUEST);
		
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

		this.forgeOutput.appendLine('🐸 Step 1: Analyzing your tests for validity...');

		const run_result = await this.runTestsAgainstModel(studentTests, w);
		const w_o = run_result.stderr;
		const source_text = run_result.runsource;

		const mutator = new Mutator(w, studentTests, w_o, testFileName, source_text);

		if (this.isConsistent(w_o)) {

			if (this.thoroughnessEnabled == false) {
				return CONSISTENCY_MESSAGE;
			}
			else {
				
				let thoroughness_candidates = await this.generateThoroughnessFeedback(mutator);
				return this.generateThoroughnessFeedbackFromCandidates(thoroughness_candidates);
			}
		}


		const testNames = getFailingTestNames(w_o);
		const noTestFound = `I found a runtime or syntax error in your tests:
${w_o}`;

		if (testNames.length == 0) {
			return noTestFound;
		}
		
		try {

			if (this.mutationStrategy == "Per Test") {

				let per_test_hints = await this.runPerTestStrategy(w, w_o, studentTests, testFileName, source_text);
				
				// Now need to annotate per test hints with the test name.
				this.forgeOutput.appendLine(`🐸 Step 2: I suspect that the following test(s) may be inconsistent with the problem specification.`);
				this.forgeOutput.appendLine(`Generating feedback around these tests ⌛`);


				let composite_hint = "";
				// Now we need to choose a hint per test. But what about ambiguous tests? This is where it happens?
				for (var test in per_test_hints) {

					var hint = this.generateHintFromCandidates(per_test_hints[test])
					if (hint == "") {
						hint = this.recordAmbiguousTest(testFileName, studentTests, mutator.forge_output);
					}

					composite_hint += `\n${test} : ${hint}\n`;
				}
				return composite_hint;
			}

			else if (this.mutationStrategy == "Comprehensive"){
				var hints = await this.runComprehensiveStrategy(mutator, studentTests, testFileName);
				return this.generateHintFromCandidates(hints);
			}
			else {
				return "Something was wrong in the extension settings. toadusponens.feedbackStrategy must be either 'Comprehensive' or 'Per Test'";
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

			if (mutator.inconsistent_tests.length == 0) {
				return [];
			}
			
			this.forgeOutput.appendLine(`🐸 Step 2: I suspect that the following ${mutator.inconsistent_tests.length} test(s) may be inconsistent with the problem specification:\n ${assessed_tests}`);
			this.forgeOutput.appendLine(`Generating feedback around these tests ⌛`);

			try {
				var hints = await this.tryGetHintsFromMutantFailures(testFileName, mutator.mutant, mutator.student_preds, mutator.forge_output);
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
			var hints = await this.tryGetHintsFromMutantFailures(testFileName, lineMutator.mutant, lineMutator.student_preds, outputline);
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


	private async runTestsAgainstModel(tests: string, model: string): Promise<RunResult> {

		const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
		let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, this.forgeOutput);
		const toRun = combineTestsWithModel(model, tests);
		const LAUNCH_FAILURE_ERR = "Could not run Toadus Ponens process.";

		let runresult = new RunResult("", "", toRun);

		// Write the contents of toRun to a temporary file
		const tempFilePath = tempFile();
		try {
			fs.writeFileSync(tempFilePath, toRun);
			let r = racket.runFile(tempFilePath);

			if (!r) {
				vscode.window.showErrorMessage(LAUNCH_FAILURE_ERR);
				console.error(LAUNCH_FAILURE_ERR);
				runresult.stderr = LAUNCH_FAILURE_ERR;
				return runresult;
			}

			if (r?.stdout != null) {
				r.stdout.on('data', (data: string) => {
					runresult.stdout += data;
				});
			}

			if (r?.stderr != null) {
				r.stderr.on('data', (err: string) => {
					runresult.stderr += err;
				});
			}

			await new Promise((resolve) => {
				r?.on('exit', resolve);
			});
		
		} catch (e) {

			vscode.window.showErrorMessage(`Toadus Ponens run failed, perhaps be because VS Code did not have permission to write a file to your OS temp folder (${os.tmpdir()}). Consult the Toadus Ponens guide for how to modify this. Full error message : ${e}`);
			runresult.stderr = e;
		}

		finally {
			// Delete the temporary file 
			fs.unlinkSync(tempFilePath);
		}

		return runresult;
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


	private async tryGetFailingHintsFromAutograderOutput(ag_output: string, testFileName: string): Promise<string[]> {

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

	async tryGetHintsFromMutantFailures(testFileName: string, mutant: string, student_preds: string, w_o: string, event : Event = Event.CONCEPTUAL_MUTANT): Promise<string[]> {


		// TODO: This isn't always for thoroughness!
		const payload = {
			"testFileName": testFileName,
			"assignment": testFileName.replace('.test.frg', ''),
			"student_preds": student_preds,
			"test_failure_message": w_o,
			"conceptual_mutant": mutant
		}
		this.logger.log_payload(payload, LogLevel.INFO, event)

		const autograderTests = await this.getAutograderTests(testFileName);
		const ag_meta = await this.runTestsAgainstModel(autograderTests, mutant);
		const ag_output = ag_meta.stderr;
		return await this.tryGetFailingHintsFromAutograderOutput(ag_output, testFileName);
	}

	private async tryGetPassingHintsFromAutograderOutput(ag_output: string, testFileName: string): Promise<string[]> {

		const failed_tests = getFailingTestNames(ag_output);
		const hint_map = await this.getHintMap(testFileName);

		const test_names = Object.keys(hint_map);
		let missingTests = test_names.filter(x => !failed_tests.includes(x));
		const hint_candidates = missingTests.map((tName) => hint_map[tName]);
		return hint_candidates;
	}

	async tryGetHintsFromMutantPasses(testFileName: string, mutant: string, student_preds: string): Promise<string[]> {


		const payload = {
			"testFileName": testFileName,
			"assignment": testFileName.replace('.test.frg', ''),
			"student_preds": student_preds,
			"conceptual_mutant": mutant
		}
		this.logger.log_payload(payload, LogLevel.INFO, Event.THOROUGHNESS_MUTANT)

		const autograderTests = await this.getAutograderTests(testFileName);
		const ag_meta = await this.runTestsAgainstModel(autograderTests, mutant);
		const ag_output = ag_meta.stderr;
		return await this.tryGetPassingHintsFromAutograderOutput(ag_output, testFileName);
	}

	async generateThoroughnessFeedback(mutator : Mutator) : Promise<string[]> {

		this.forgeOutput.appendLine(CONSISTENCY_MESSAGE);
		this.forgeOutput.appendLine(`🐸 Step 2: Asessing the thoroughness of your test-suite. I will ignore ANY tests that are not in 'test-suite's`);
		this.forgeOutput.show();

		/*
			- For each test-suite, identify the predicate being tested.
			- For each test in the suite.
				- Produce a predicate that characterizes the test.
				- Exclude these predicates from the predicate under test.
		*/

	
		var positiveMutator = new Mutator(mutator.wheat, mutator.student_tests, mutator.forge_output, mutator.test_file_name, mutator.source_text);
		var negativeMutator = new Mutator(mutator.wheat, mutator.student_tests, mutator.forge_output, mutator.test_file_name, mutator.source_text);
		var nullMutator = new Mutator(mutator.wheat, mutator.student_tests, mutator.forge_output, mutator.test_file_name, mutator.source_text);
		

		positiveMutator.mutateToPositiveTests();
		negativeMutator.mutateToNegativeTests();
		nullMutator.mutateToVaccuity();

		let skipped_tests = positiveMutator.error_messages.join("\n") + negativeMutator.error_messages.join("\n");
		this.forgeOutput.appendLine(skipped_tests);

		let tests_analyzed = positiveMutator.num_mutations + negativeMutator.num_mutations;

		// There should be one mutation per considered, consistent test
		this.forgeOutput.appendLine(`🐸 Step 3: Generating a hint to help you improve test thoroughness, with the remaining ${tests_analyzed} tests in mind. ⌛\n`);
		this.forgeOutput.show();
		try {
			let thoroughness_hints = await this.tryGetHintsFromMutantPasses(positiveMutator.test_file_name, positiveMutator.mutant, positiveMutator.student_preds);
			let negative_thoroughness_hints = await this.tryGetHintsFromMutantFailures(negativeMutator.test_file_name, negativeMutator.mutant, negativeMutator.student_preds, negativeMutator.forge_output, Event.THOROUGHNESS_MUTANT);	
			
			// TODO: RIght now we do intersection. Rather, we want to do one more run, where we test our positive tests (ie zero out everything and get the positive tests there)
			// Then subtract these!
			// THIS IS WRONG I THINK
			let get_positive_tests = await this.tryGetHintsFromMutantPasses(nullMutator.test_file_name, nullMutator.mutant, nullMutator.student_preds);
			
			const intersection = thoroughness_hints.filter(hint => negative_thoroughness_hints.includes(hint));
			return intersection;
		}
		catch (e) {
			vscode.window.showErrorMessage(this.SOMETHING_WENT_WRONG);
			this.forgeOutput.appendLine(e.message);
			return [this.SOMETHING_WENT_WRONG];
		}
	}

}