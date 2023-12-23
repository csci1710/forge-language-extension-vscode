import {RacketProcess} from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { assertion_regex, example_regex, test_regex, adjustWheatToStudentMisunderstanding, getPredicatesOnly } from './forge-utilities'; 
/*
	Potential issues : Name clash between student files and grader files.
*/

const WHEATSTORE = "https://sidprasad.github.io/dirtree";

export async function runHalp(studentTests: string, testFileName: string): Promise<string> {
	const w = await getWheat(testFileName);
	if (w === "") {
		return "Network error. Terminating run.";
	}

	const  w_o = await runTestsAgainstModel(studentTests, w);
	if (w_o === "") {
		return "Your tests were consistent with the problem specification.";
	}

	const testName = getFailingTestName(w_o);

	// TODO: This default text  is what is shown where we are in the modelling space
	// (or more correctly, NOT an example and NOT in the autograder space)
	// It's not that they are right, we do not know if they are specifically wrong.
	// Ask Tim what to do here!
	const defaultFeedback = `Cannot provide feedback around ${testName}.
							Since this HALp can only provide feedback one test at a time,
							you may want to comment out this test and run the HALp again
							if you want feedback on any *other* tests.`;
	if (example_regex.test(w_o)) {
		return w_o;
	}
	if (assertion_regex.test(w_o)) {
		const student_preds = getPredicatesOnly(studentTests); 

		const hint = await tryGetHintFromAssertion(testFileName, w, student_preds, w_o);
		if (hint != "") {
			return `${testName} is not consistent with the problem specification.` + hint;
		}
	}
	return defaultFeedback;
}


async function runTestsAgainstModel (tests: string, model: string): Promise<string> {

	const forgeOutput = vscode.window.createOutputChannel('HALP Output');
	const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
	let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, forgeOutput);

	const toRun = combineTestsWithModel(model, tests);

	// Write the contents of toRun to a temporary file
	const tempFilePath = tempFile();
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


function tempFile(): string {
	const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const length = 10;
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result + '.rkt';
}


function combineTestsWithModel(wheatText: string, studentTests: string) : string {
	// todo: What if separator doesn't exist (in that case, look for #lang forge)
	const TEST_SEPARATOR = "//// Do not edit anything above this line ////"

	if (studentTests.includes(TEST_SEPARATOR)) {
		const startIndex = studentTests.indexOf(TEST_SEPARATOR) + TEST_SEPARATOR.length;
		studentTests = studentTests.substring(startIndex).trim();
	}
	return wheatText + "\n" + studentTests;
}

async function downloadFile(url: string): Promise<string>  {

	const response = await fetch(url);
	if (response.ok) {
		const t = await response.text();
		return t;
	} else {
		// ERROR
		return "";
	}

}

async function getWheat(testFileName: string): Promise<string> {
	const wheatName = path.parse(testFileName.replace('.test.frg', '.wheat')).base;
	const wheatURI = `${WHEATSTORE}/${wheatName}`;
	return await downloadFile(wheatURI);
}

async function getAutograderTests(testFileName: string): Promise<string> {
	const graderName = path.parse(testFileName.replace('.test.frg', '.grader')).base;
	const graderURI = `${WHEATSTORE}/${graderName}`;
	return await downloadFile(graderURI);
}

async function getHintMap(testFileName: string): Promise<Object> {
	const graderName = path.parse(testFileName.replace('.test.frg', '.grader.json')).base;
	const graderURI = `${WHEATSTORE}/${graderName}`;
	const jsonString = await downloadFile(graderURI);
	try {
		const jsonObject = JSON.parse(jsonString);
		return jsonObject;
	}
	catch {
		return {};
	}
}

function getFailingTestName(o: string): string {
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
async function tryGetHintFromAssertion(testFileName: string, w : string, student_preds : string, w_o : string) : Promise<string> {

	let w_wrapped = adjustWheatToStudentMisunderstanding(testFileName, w, student_preds, w_o);
	const autograderTests = await getAutograderTests(testFileName);
	const ag_output = await runTestsAgainstModel(autograderTests, w_wrapped);
	const tName = getFailingTestName(ag_output);
	const hint_map = await getHintMap(testFileName)
	const hint_text = hint_map[tName] || "";
	return hint_text;
}