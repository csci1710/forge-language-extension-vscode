import {RacketProcess} from './racketprocess';
import * as vscode from 'vscode';
import * as fs from 'fs';

export async function runHalp(studentTests: string, testFileName: string): Promise<string> {
	
	const w = getWheat(testFileName);
	const  w_o = await executeAgainstWheat(studentTests, w);

	if (w_o === "") {
		return "Your tests were consistent with the problem specification.";
	}

	if (w_o.includes("Invalid example")) {
		return w_o;
	}

			
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


		// Now execute (w_wrapped) + (tests) against autograder


		// Use x, op, and y here
	}
		
		/*
			Theorem Assertion injective is sufficient for isDirectedTree failed. Found instance:
			#(struct:Sat (#hash((Node . ((Node1) (Node2) (Node3))) (edges . ((Node1 Node3) (Node2 Node2) (Node3 Node1))))) ((size-variables 389) (size-clauses 606) (size-primary 20) (time-translation 167) (time-solving 16) (time-building 109)) ())\n
		*/

		// Here, we do something with the output.

		// GOAL: Get a counter example, determine WHY the counter-example fails the target predicate. If we can do this,
		// we can then even determine why an example fails.

		// If the modified property is always unsat, we can ask the question : Can you think of any scenarios where <lhs pred> and <rhs pred> could both be true?


		/*
			## An ideal approach might be to guess at what their implementation might be.
			
			- Mutate the wheat so [counter example] is accepted. 
			- Or mutate the wheat so the asserted property is true.
			
			Now run the autograder, and use that to generate some feedback.

			## Another approach may be:

			Lets get the counter example, and convert it to a Forge example. 
			We can then run this example against a set of important *properties*.

			So generate a bunch of tests:

			example e1 is (is not) p1 {   				// is/isnot depends on the test. We can do some munging here to *try* and figure out which.
				//counter example
			}

			example e2 is  (is not) p2 {
				// counter example
			}

			Find the first example that [FAILS] --> provide the relevant feedback.

		*/

		/*
		We know : The failing test's name (if it has one)
			- Unfortunately, we don't have a nice language server that can help us parse out the test + its dependencies :(
			- Either it is an EXAMPLE, in which case (can we help?) (or do we even want to present a hint. We may not have enough insight beyond the classic Examplar technique).
			- Else: have a counter example an
				- Can we use this counter example to understand anything? Could we show this to students? 
					From last year, clearly this is *too* much info, maybe students msunderstand something?
				- Is there any way we can determine whether the failing test fails because it is in the specified space OR otherwise?
		
			- Sidenote: What if it *is* in the failing part of the specification, should we ask students to comment out this test, or can we somehow skip it in the subsequent execution?
		
			- Concern: We don't want students to overfit to the wheat. (How do they avoid this in CS19? -- only allow examples).
			- Can we determine if 'is necessary for' and 'is sufficient for' are both paired? We can never stop this, they could run it sequentially.

			-- What if we had a bunch of properties that were all underconstraints? Then we could fail a sufficiency test  right?
			-- What if we had a bunch of propterties that were all overconstraints? Then we could fail a necessity test  right?
			-- Can we leverage ``test suite for {}``


			*/

		/*
			Imagine if we only supported necessary and sufficient for HALP.
			Parse: First print "Theorem ...... failed."
			Alternately we could print example ABCDE failed.

			If example => not sure if we can provide more insight
			If test expect or theorem? 
				We have a counter example. What can we do with it?

				OR: Can we do Tim's example of combining multiple things?
				SO: First try some very constrained things? OR: Most permissive wheat? OR: How do we test test cases?
			

		*/
	return "HINT DEFAULT";
}


async function executeAgainstWheat (studentTests: string, wheatText: string): Promise<string> {

	const forgeOutput = vscode.window.createOutputChannel('HALP Output');
	const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
	let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, forgeOutput);

	const toRun = combineTestsWithWheat(wheatText, studentTests);

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

	const TEST_SEPARATOR = "//// Do not edit anything above this line ////"

	// TODO: Get all the text in student Tests AFTER TEST_SEPARATOR
	// append to wheat text and return


	return wheatText + "\n" + studentTests
}

function getWheat(testFileName: string): string {
	const wheatName = testFileName.replace('.test.frg', '.wheat');
	
	// Fetch wheat from [<somewhere>] , update its name appropriately.
	// May have to fetch an array of wheats.

	// Also need to makesure runsterling is off in the test file, etc.

	return `#lang forge

	option run_sterling off
	sig Node {edges: set Node}
	
	pred isDirectedTree {
		edges.~edges in iden -- Injective, each child has at most one parent
		lone edges.Node - Node.edges -- At most one element that does not have a parent
		no (^edges & iden) -- No loops
		lone Node or Node in edges.Node + Node.edges -- Either one node or every node has either a child or a parent.
	}`;
}

function parseForgeOutput(w_o : string) {


	const foundInstanceIndex = w_o.indexOf("Found instance:");
	const leftSubstring = w_o.substring(0, foundInstanceIndex).trim();
	const rightSubstring = w_o.substring(foundInstanceIndex + "Found instance:".length).trim();


}