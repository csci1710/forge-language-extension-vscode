import {RacketProcess} from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { assertion_regex, example_regex, test_regex, adjustWheatToStudentMisunderstanding, getPredicatesOnly, BothPredsStudentError } from './forge-utilities'; 
import { LogLevel, Logger, Event } from './logger';
import { SymmetricEncryptor } from './encryption-util';


/*
	HALP currently does not work with obfuscated wheats. Can we do some simple hiding here?
	(wheats on server are encrypted, and then are decrypted *in memory* here?)

	Potential issues : Name clash between student files and grader files.

	Should we present this as a 'Smart TA' rather than a hinting mechanism? Examplar
	hinting suggests students perhaps don't want to *ask* for hints? Pride?

	Perhaps the name of the frog that backs the course? Could list it on the course page.
*/

export class HalpRunner {

	static WHEATSTORE = "https://sidprasad.github.io/dirtree";
	logger : Logger;
	encryptor : SymmetricEncryptor = new SymmetricEncryptor();

	constructor(logger: Logger) {
		this.logger = logger;
	}

	async runHalp(studentTests: string, testFileName: string): Promise<string> {
		const w = await this.getWheat(testFileName);
		if (w === "") {
			return "Network error. Terminating run.";
		}

		const  w_o = await this.runTestsAgainstModel(studentTests, w);
		if (w_o === "") {
			return `Your tests are all consistent with the assignment specification.
			However, it's important to remember that this doesn't automatically mean the tests are exhaustive or explore every aspect of the problem.`;
			
			/*
				This is where we could (would?) add some sort of metric around thoroughness.

				1. We could check coverage of their tests against the wheat (somehow). 
					Cons: We don't care about the parts of the wheat that are not super important to the problem.
				
				2. We could straight up *count* the number of tests. Is every predicate in the solution covered?
					-- This seems overly constrictive, we would also have to identify (somehow) every exported predicate in
					the wheat.
				

			*/


			// TODO: Can we add some sort of thoroughness metric?
			/*This means that all of your tests are passing, 
			 but you may want to add more tests to ensure your code explores more aspects of the problem.`;
			 */
		}

		const formurl = "https://forms.gle/t2imxLGNC7Yqpo6GA"
		const testName = this.getFailingTestName(w_o);

		// TODO: This default text  is what is shown where we are in the modelling space
		// (or more correctly, NOT an example and NOT in the autograder space)
		// It's not that they are right, we do not know if they are specifically wrong.
		// Ask Tim what to do here!
		const defaultFeedback = `${testName} examine behaviors that are either ambiguous or not clearly defined in the problem specification.
		This test is not necessarily incorrect, but I cannot provide feedback around it. 
		If you want feedback around other tests you have written, you will have to temporarily comment out this test and run me again.
		
		If you disagree with this assessment, and believe that this test does deal with behavior explicitly described in the problem specification,
		please fill out this form: ${formurl}`;
		
		if (example_regex.test(w_o)) {
			return w_o;
		}
		if (assertion_regex.test(w_o)) {
			const student_preds = getPredicatesOnly(studentTests); 

			try {
				var hint = await this.tryGetHintFromAssertion(testFileName, w, student_preds, w_o);
			}
			catch (e)
			{
				if (e instanceof BothPredsStudentError) {
					return `Sorry! I cannot provide feedback around ${testName}. ` + e.message;
				} 
				hint = e.message;
			}
			if (hint != "") {
				return `${testName} is not consistent with the problem specification. ` + hint;
			}
		}
		else if (test_regex.test(w_o)) {
			return `Sorry! I cannot provide feedback around ${testName}.
			If you want feedback around other tests you have written, you will have to temporarily comment out this test and run me again.`;
		}
		

		const payload = {

			"studentTests": studentTests,
			"wheat_output" : w_o,
			"testFile" : testFileName
		}
		this.logger.log_payload(payload, LogLevel.INFO, Event.AMBIGUOUS_TEST)	
		return defaultFeedback;
	}


	private async runTestsAgainstModel (tests: string, model: string): Promise<string> {

		const forgeOutput = vscode.window.createOutputChannel('HALP Output');
		const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
		let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, forgeOutput);

		const toRun = this.combineTestsWithModel(model, tests);

		// Write the contents of toRun to a temporary file
		const tempFilePath = this.tempFile();
		try {
			fs.writeFileSync(tempFilePath, toRun);

			// Need to examine and interpret results here.
			let r = racket.runFile(tempFilePath);

			if (!r) {
				console.error('Cannot spawn Forge process');
				return "HALP run failed."
			}


			let stdoutput = "";
			r.stdout.on('data', (data: string) => {
				stdoutput += data;
			});

			let stderrput = "";

			r.stderr.on('data', (err: string) => {
				stderrput += err;
			});

			// wait till r exits
			await new Promise((resolve) => {
				r.on('exit', resolve);
			});
			

			return stderrput;
		} finally {
			// Delete the temporary file in the finally block
			fs.unlinkSync(tempFilePath);
		}
	}


	private tempFile(): string {
		const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const length = 10;
		let result = '';

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomIndex);
		}

		return result + '.rkt';
	}


	private combineTestsWithModel(wheatText: string, studentTests: string) : string {
		// todo: What if separator doesn't exist (in that case, look for #lang forge)
		const TEST_SEPARATOR = "//// Do not edit anything above this line ////"

		if (studentTests.includes(TEST_SEPARATOR)) {
			const startIndex = studentTests.indexOf(TEST_SEPARATOR) + TEST_SEPARATOR.length;
			studentTests = studentTests.substring(startIndex).trim();
		}
		return wheatText + "\n" + studentTests;
	}

	private async downloadFile(url: string): Promise<string>  {

				const response = await fetch(url);
		if (response.ok) {
			const t = await response.text();
			return this.encryptor.decrypt(t);
		} else {
			// ERROR
			this.logger.log_payload({"url": url}, LogLevel.ERROR, Event.FILE_DOWNLOAD)
			return "";
		}

	}

	private async getWheat(testFileName: string): Promise<string> {
		const wheatName = path.parse(testFileName.replace('.test.frg', '.wheat')).base;
		const wheatURI = `${HalpRunner.WHEATSTORE}/${wheatName}`;
		return await this.downloadFile(wheatURI);
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

	private getFailingTestName(o: string): string {
		if (assertion_regex.test(o)) {
			const match = o.match(assertion_regex);
			const lhs_pred = match[1];	
			const op = match[2];
			const rhs_pred = match[3];
			return "Assertion " + lhs_pred + " is " + op + " for " + rhs_pred;
		} else if (example_regex.test(o)) {
			const match = o.match(example_regex);
			return match[1];
		} else if (test_regex.test(o)) {
			const match = o.match(test_regex);
			return match[1];
		} 
		return "";
	}

	// w : wheat
	// w_o : wheat output
	private async tryGetHintFromAssertion(testFileName: string, w : string, student_preds : string, w_o : string) : Promise<string> {

		let w_wrapped = adjustWheatToStudentMisunderstanding(testFileName, w, student_preds, w_o);
		// We should log all the conceptual mutants we generate!!
		// LOG w_wrapped

		const payload = {
			"testFileName": testFileName,
			"assignment": testFileName.replace('.test.frg', ''),
			"student_preds": student_preds,
			"test_failure_message": w_o,
			"conceptual_mutant": w_wrapped
		}

		this.logger.log_payload(payload, LogLevel.INFO, Event.CONCEPTUAL_MUTANT)

		const autograderTests = await this.getAutograderTests(testFileName);
		const ag_output = await this.runTestsAgainstModel(autograderTests, w_wrapped);
		const tName = this.getFailingTestName(ag_output);
		const hint_map = await this.getHintMap(testFileName)
		const hint_text = hint_map[tName] || "";
		return hint_text;
	}
}