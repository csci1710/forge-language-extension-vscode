import {RacketProcess} from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { 
	assertion_regex, example_regex, test_regex, adjustWheatToStudentMisunderstanding, getPredicatesOnly, BothPredsStudentError ,
	exampleToPred, getSigList, getPredList, findExampleByName,
	removeForgeComments, constrainPredicateByExclusion, easePredicate
} from './forge-utilities'; 
import { LogLevel, Logger, Event } from './logger';
import { SymmetricEncryptor } from './encryption-util';


const NOT_ENABLED_MESSAGE = "Sorry! Toadus Ponens is not available for this assignment. Please contact course staff if you believe this is an error.";

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

		
		studentTests = studentTests.replace(/\r/g, "\n");

		const w = await this.getWheat(testFileName);
		if (w === "") {
			return "Network error. Terminating run.";
		}
		else if (w === NOT_ENABLED_MESSAGE) {
			return NOT_ENABLED_MESSAGE;
		}

		const  w_o = await this.runTestsAgainstModel(studentTests, w);
		if (w_o == "") {
			return `Your tests are all consistent with the assignment specification.
			However, it's important to remember that this doesn't automatically mean the tests are exhaustive or explore every aspect of the problem.`;
			
			// TODO: Can we add some sort of thoroughness metric?
			/*This means that all of your tests are passing, 
			 but you may want to add more tests to ensure your code explores more aspects of the problem.`;
			 */
		}


		const formurl = "https://forms.gle/t2imxLGNC7Yqpo6GA"
		const testName = this.getFailingTestName(w_o);

		const assertionsBetter = `\n\u{2139} I am sorry I could not provide more feedback here. 
		I am better at providing more detailed feedback when analyzing assertions than examples.`;

		const defaultFeedback = `I found a runtime or syntax error in your tests:
${w_o}`;
		if (testName == "") {
			return defaultFeedback;
		}

		
		if (example_regex.test(w_o)) {

			// Fundamentally the issue is that the characteristic predicate from a 
			// positive example gives us such a *specific* modification to a predicate,
			// that it is rare for us to offer meaningful feedback.
			try {
				var hint = await this.tryGetHintFromExample(testName, testFileName, w, studentTests, w_o);
				if (hint != "")
				{
					return `${testName} is not consistent with the problem specification. ` + hint;
				}
			}
			catch (e) {
			}

			return w_o + assertionsBetter;
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

			const payload = {

				"studentTests": studentTests,
				"wheat_output" : w_o,
				"testFile" : testFileName
			}
			this.logger.log_payload(payload, LogLevel.INFO, Event.AMBIGUOUS_TEST);

			// Else, return this feedback around no hint found.
			return `"${testName}" examines behaviors that are either ambiguous or not clearly defined in the problem specification.
This test is not necessarily incorrect, but I cannot provide feedback around it. 
If you want feedback around other tests you have written, you will have to temporarily comment out this test and run me again.

If you disagree with this assessment, and believe that this test does deal with behavior explicitly described in the problem specification,
please fill out this form: ${formurl}`;

		}
		else if (test_regex.test(w_o)) {
			return `Sorry! I cannot provide feedback around the test "${testName}".
			If you want feedback around other tests you have written, you will have to temporarily comment out this test and run me again.`;
		}
		
		return defaultFeedback;
	}


	private async runTestsAgainstModel (tests: string, model: string): Promise<string> {

		const forgeOutput = vscode.window.createOutputChannel('Toadus Ponens Output');
		const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
		let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, forgeOutput);

		const toRun = this.combineTestsWithModel(model, tests);

		// Write the contents of toRun to a temporary file
		const tempFilePath = this.tempFile();
		try {
			fs.writeFileSync(tempFilePath, toRun);

			console.log(__dirname);

			// Need to examine and interpret results here.
			let r = racket.runFile(tempFilePath);

			if (!r) {
				console.error('Cannot spawn Forge process');
				return "Toadus Ponens run failed."
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
		} 
		
		this.logger.log_payload({"url": url}, LogLevel.ERROR, Event.FILE_DOWNLOAD)
		if (response.status === 404) {
			return NOT_ENABLED_MESSAGE;
		}
		else {
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
		return await this.get_hint_from_autograder_output(ag_output, testFileName);
	}

	// TODO: ISSUE: Does not play nice with parameterized predicates.
	private async tryGetHintFromExample(testName : string, testFileName: string, w : string, studentTests : string, w_o : string) : Promise<string> {
		studentTests = removeForgeComments(studentTests);
		const sigNames = getSigList(w);
		const wheatPredNames = getPredList(w);
		const failedExample = findExampleByName(studentTests, testName);

		// TODO: Potential ISSUE: What if they wrap the negation in () or extra {}? 
		const negationRegex = /(not|!)\s+(\b\w+\b)/;
		const isNegation = failedExample.examplePredicate.match(negationRegex);
		
		// Change the target predicate.
		if (isNegation != null) {
			failedExample.examplePredicate = isNegation[1];
		}

		const exampleAsPred = exampleToPred(failedExample, sigNames, wheatPredNames);
		const student_preds = getPredicatesOnly(studentTests) + "\n" + exampleAsPred + "\n";
		let w_with_student_preds = w + "\n" + student_preds + "\n";

		var w_wrapped = "";
		if (isNegation != null) {
			// Student Belief: failedExample.exampleName => (not failedExample.examplePredicate)
			/*
				Modify the wheat to be 

				i' {
					i and (not s)	
				}
			*/
			w_wrapped = constrainPredicateByExclusion(w_with_student_preds, failedExample.examplePredicate, failedExample.exampleName);
		}

		else {
			// Student Belief :	failedExample.exampleName => failedExample.examplePredicate 
			// TODO:  This is a hack to re-use code. I should fix it.
			const student_belief = `Theorem Assertion ${failedExample.exampleName} is sufficient for ${failedExample.examplePredicate} failed.`; 
			w_wrapped = w_wrapped = easePredicate(w_with_student_preds, failedExample.examplePredicate, failedExample.exampleName);
		}

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
		return await this.get_hint_from_autograder_output(ag_output, testFileName);
	}


	async get_hint_from_autograder_output(ag_output : string, testFileName : string) {
		
		if (ag_output == "") {
			return "";
		}
		const tName = this.getFailingTestName(ag_output);
		const hint_map = await this.getHintMap(testFileName);

		if (tName in hint_map) {
			return hint_map[tName];
		}
		throw new Error("Something went wrong when generating further feedback around this test. Please contact course staff fif you need more feedback.");
	}
}