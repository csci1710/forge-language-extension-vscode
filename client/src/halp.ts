import {RacketProcess} from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';

async function runHalp(studentTests: string, testFileName: string): Promise<string> {
	
	const forgeOutput = vscode.window.createOutputChannel('HALP Output');
	const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
	let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, forgeOutput);

	// Get the appropriate includes
	const wheatText = getWheat(testFileName);

	const toRun = studentTests + wheatText;

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
		

		// parse its output looking for the failing test name.

		// Generate the hint related to the failing test name.

		// This bit is a bit fuzzy -- how do I really get an idea
		// of what's going on. Say we have a bunch of properties for
		// undirected tree. Should we look at how their test interacts with these
		// properties? This is complicated.
		// Instead, should we be looking at the wheat?
		// So find their test that fails the wheat -- now what do we do?
		// We need to understand ''why'' the test fails the wheat right?

		// So why does the test fail the wheat? We can look at the counterexample.
		// Or we can somehow encode some autograder properties in the wheat?
		// hmm.

		// We know : The failing test
		// Have a counter example (maybe?) 
		// Let us not generate hints for examples.
		// Instead lets focus on assertions.
		// Can we use this counter example to understand anything? We can also determine if the (test iff wheat)
		// is an over or under constraint.



		// Alternatively we could do the classic chaff approach of havign all
		// the potential hint variants and running all of them, til one fails?
		// I was hoping we could do better here though!



		return "";
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

function getWheat(testFileName: string): string {
	const wheatName = testFileName.replace('.test.frg', '.wheat');
	
	// Fetch wheat from [<somewhere>] , update its name appropriately.
	// May have to fetch an array of wheats.
	return "";
}

