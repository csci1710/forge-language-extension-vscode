import {RacketProcess} from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';

function runHalp(studentTests: string, testFileName: string): string {
	
	const forgeOutput = vscode.window.createOutputChannel('Forge Output');
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

