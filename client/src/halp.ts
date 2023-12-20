import {RacketProcess} from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


const WHEATSTORE = "https://sidprasad.github.io/dirtree";

export async function runHalp(studentTests: string, testFileName: string): Promise<string> {
	
	const w = await getWheat(testFileName);

	if (w === "") {
		return "HALP could not connect to the internet. Terminating run.";
	}

	const  w_o = await runTestsAgainstModel(studentTests, w);

	if (w_o === "") {
		return "Your tests were consistent with the problem specification.";
	}

	if (w_o.includes("Invalid example")) {
		return w_o;
	}

	// Add one for test-expect.
			
	const regex = /Theorem Assertion (\w+) is (\w+) for (\w+) failed\./;
	const match = w_o.match(regex);

	if (match) {
		const lhs_pred = match[1];
		
		const op = match[2];
		const rhs_pred = match[3];

		const lhs_pred_inner = lhs_pred + "_inner";
		const rhs_pred_inner = rhs_pred + "_inner";

		const isLhsPredContained = new RegExp(`\\b${lhs_pred}\\b`).test(w);
		const isRhsPredContained = new RegExp(`\\b${rhs_pred}\\b`).test(w); 


		if (isLhsPredContained && isRhsPredContained) {
			return "No student code detected in failing assertion " + lhs_pred + " is " + op + " for " + rhs_pred;
		}
		else if (!isLhsPredContained && !isRhsPredContained) {
			return "Assertion " + lhs_pred + " is " + op + " for " + rhs_pred + " is not consistent with the assignment specification. HALp can only provide further feedback if the assertion explicitly references predicates defined in the assignment specification.";
		}

		var w_wrapped = "";
		var added_pred = "";		
						

		// Now we want to append the new predicate, to the file.
		// TODO: 	// DOUBLE CHECK THESE
		if (isLhsPredContained) {

			w_wrapped = w.replace(new RegExp("\\b" + lhs_pred + "\\b", 'g'), lhs_pred_inner);

			added_pred = (op == 'sufficient') ? 
						`
						pred ${lhs_pred} 
						{ 
							${lhs_pred_inner}
							${lhs_pred_inner} implies ${rhs_pred}
						}
						` : 
						`
						pred ${lhs_pred} 
						{ 
							${lhs_pred_inner}
							${rhs_pred} implies ${lhs_pred_inner}
						}
						`;
		}
		else {

		
			w_wrapped = w.replace(new RegExp("\\b" + rhs_pred + "\\b", 'g'), rhs_pred_inner);
			
			added_pred = (op == 'sufficient') ? 
						`
						pred ${rhs_pred} 
						{ 
							${rhs_pred_inner}
							${lhs_pred} implies ${rhs_pred_inner}
						}
						` : 
						`
						pred ${rhs_pred} 
						{ 
							${rhs_pred_inner} 
							${rhs_pred_inner} implies ${lhs_pred}
						}
						`;

		}

		w_wrapped = w_wrapped + added_pred;

		const autograderTests = await getAutograderTests(testFileName);
		const ag_output = await runTestsAgainstModel(autograderTests, w_wrapped);
		const tName = getFailingTestName(ag_output);

		if (tName == "") {
			return "COULD NOT GENERATE HINT. "
		}

		// Now parse the output (look for the failing test?) if none, no hint.
		// If there is a failing test, then we can provide a hint.

		return `${tName} failed, corresponding hint was blah di blah`;
	}
	// Could not generate a hint, perhaps because this was a test but not a ...
	// At best, we can say, test is not valid.
	return "HINT DEFAULT";
}


async function runTestsAgainstModel (tests: string, model: string): Promise<string> {

	const forgeOutput = vscode.window.createOutputChannel('HALP Output');
	const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
	let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, forgeOutput);

	const toRun = combineTestsWithWheat(model, tests);

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


function combineTestsWithWheat(wheatText: string, studentTests: string) : string {
	// todo: What if separator doesn't exist (in that case, look for #lang forge)
	const TEST_SEPARATOR = "//// Do not edit anything above this line ////"

	const startIndex = studentTests.indexOf(TEST_SEPARATOR) + TEST_SEPARATOR.length;
	const studentTestsAfterSeparator = studentTests.substring(startIndex).trim();

	return wheatText + "\n" + studentTestsAfterSeparator;
}

async function getWheat(testFileName: string): Promise<string> {
	const wheatName = path.parse(testFileName.replace('.test.frg', '.wheat')).base;
	
	let wheatURI = `${WHEATSTORE}/${wheatName}`;
	const response = await fetch(wheatURI);
	if (response.ok) {
		const wheatText = await response.text();
		return wheatText;
	} else {
		// ERROR
		return "";
	}
}



async function getAutograderTests(testFileName: string): Promise<string> {
	const graderName = path.parse(testFileName.replace('.test.frg', '.grader')).base;
	const response = await fetch(`${WHEATSTORE}/${graderName}`);
	if (response.ok) {
		const graderText = await response.text();
		return graderText;
	} else {
		// ERROR
		return "";
	}
}

function getFailingTestName(o: string): string {

	const assertion_regex = /Theorem Assertion (\w+) is (\w+) for (\w+) failed\./;
	const example_regex = /Invalid example '(\w+)'; the instance specified does not satisfy the given predicate\./;
	const test_regex = /Failed test (\w+)\./;

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
		const match = o.match(example_regex);
		return match[1];
	} 
	return "";
}