
import {spawn } from 'child_process';
import * as fs from 'fs';
import { tempFile } from './gen-utilities';

/*
	Utilites related to Forge syntax.
	Could change with Forge updates and/or a language server.
*/

export function removeForgeComments(inputText: string): string {
	let x = removeInlineComments(removeCStyleComments(inputText));
	// Normalize windows line endings
	x = x.replace(/\r/g, '');
	return x;
}

function removeCStyleComments(inputText: string): string {
	const regex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
	return inputText.replace(regex, '');
}

function removeInlineComments(inputText: string): string {
	const regex = /--.*$/gm;
	return inputText.replace(regex, '');
}



export function findForgeExamples(inputText) {
    const withoutComments = removeForgeComments(inputText);
    const lines = withoutComments.split('\n');
    let inExample = false;
    let braceLevel = 0;
    let currentExample = '';
    let examples : string[]= [];

    for (let line of lines) {
        if (inExample) {
            currentExample += line + '\n';
            braceLevel += (line.match(/\{/g) || []).length;
            braceLevel -= (line.match(/\}/g) || []).length;

            if (braceLevel === 0) {
                examples.push(currentExample.trim());
                currentExample = '';
                inExample = false;
            }
        } else {
            // Adjusted regex to match the example syntax
            const match = line.match(/\bexample\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+is\s+(.*?)\s+for\s*\{/);
            if (match) {
                inExample = true;
                braceLevel = 1;  
                currentExample = line + '\n';
            }
        }
    }

    return examples;
}


export const quantified_assertion_regex = /:(\d+):(\d+) \(span (\d+)\)\] Theorem .*_Assertion_All_(\w+)_is_(\w+)_for_(\w+)/;
export const assertion_regex = /Theorem Assertion[ _](\w+)[ _]is[ _](\w+)[ _]for[ _](\w+) failed\./;
export const example_regex = /Invalid example '(\w+)'; the instance specified does not satisfy the given predicate\./;
export const test_regex = /Failed test (\w+)\.|Theorem (\w+) failed/;

const predicatePattern =  /pred\s+([^]*?)({|\n|$)/;





// export function assertionToExpr(lhs, rhs, op, quantifier_prefix = "") : string {


// 	if (op == "sufficient") {
// 		return `(${quantifier_prefix} ${lhs} => ${rhs})`;
// 	}
// 	else if (op == "necessary") {
// 		return `(${quantifier_prefix} ${rhs} => ${lhs})`;
// 	}
// 	else {
// 		throw new Error("Invalid op");
// 	}
// }



export function getFailingTestNames(o: string): string[] {

	let lines = o.split("\n");
	return lines.map(getFailingTestName).filter((x) => x != "");
}


export function getFailingTestName(o: string): string {
	if (quantified_assertion_regex.test(o)) {
		const match = o.match(quantified_assertion_regex);

		if (match == null) {
			return "";
		}


		const lhs_pred = match[4] ;	
		const op = match[5];
		const rhs_pred = match[6];
		return "Assertion All " + lhs_pred + " is " + op + " for " + rhs_pred;

	} else if (assertion_regex.test(o)) {

		
		const match = o.match(assertion_regex);
		if (match == null) {
			return "";
		}

		const lhs_pred = match[1];	
		const op = match[2];
		const rhs_pred = match[3];
		return "Assertion " + lhs_pred + " is " + op + " for " + rhs_pred;
	} else if (example_regex.test(o)) {
		const match = o.match(example_regex);
		if (match == null) {
			return "";
		}
		return match[1];
	} else if (test_regex.test(o)) {
		const match = o.match(test_regex);
		if (match == null) {
			return "";
		}
		if (match[1]) return match[1];
		return match[2]
	} 
	return "";
}

/*******For test suite  */

export type ExtractedTests = {

	examples: Object[];
	assertions: Object[];
	quantifiedAssertions: Object[];
  
} ;

export type ExtractedTestSuite = {
	predicateName: string;
	tests: ExtractedTests;
  } | null;




// export function findAllStructuredTests(suite: string) {


// 	var examples = findAllExamples(suite);
// 	var assertions = findAllAssertions(suite);
// 	var quantifiedAssertions = findAllQuantifiedAssertions(suite);

// 	return {examples, assertions, quantifiedAssertions};
// }
  
  
  function isBalancedBraces(content: string): boolean {
	const stack: string[] = [];
	for (const char of content) {
	  if (char === '{') {
		stack.push(char);
	  } else if (char === '}') {
		if (stack.length === 0) return false;
		stack.pop();
	  }
	}
	return stack.length === 0;
  }



///// Version Check //////////

function compareVersions(version1: string, version2: string): number {
	const parseVersion = (version: string) => version.split('.').map(Number);
	
	const v1 = parseVersion(version1);
	const v2 = parseVersion(version2);
	
	for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
	  // Treat missing parts as 0 (e.g., "1.0" is equal to "1.0.0")
	  const num1 = i < v1.length ? v1[i] : 0;
	  const num2 = i < v2.length ? v2[i] : 0;
	  
	  if (num1 > num2) return 1;
	  if (num2 > num1) return -1;
	}
	
	return 0; // Versions are equal
  }
  

export async function ensureForgeVersion(minVersion: string, error_reporter : (s : string) => void){

	const filePath = tempFile();
	const emptyForgeFile = `
	#lang forge
	test expect {

		{} is sat
	}
	`;

	fs.writeFileSync(filePath, emptyForgeFile);
	let p = spawn('racket', [`"${filePath}"`], { shell: true });

	var stdout = '';
	var stderr = '';

	const ERR_FORGE = "Could not determine Forge version. Please ensure that Forge is installed.";
	p.stderr.on('data', (err: string) => {
		stderr += err;
	});

	p.stdout.on('data', (err: string) => {
		stdout += err;
	});

	await new Promise<void>((resolve, _) => {
		p.on('exit', (code: string) => {		
			resolve();
		});
	});

	if (stderr != '') {
		error_reporter(stderr);
	} else if (stdout == '') {
		error_reporter(ERR_FORGE);
	} else {
		const forgeVersionRegex = /Forge version: (\d+\.\d+\.\d+)|(\d+.\d+)/;
		const match = stdout.match(forgeVersionRegex);
		if (match) {

			let version = (match[1] == undefined) ? (match[2] + ".0") : match[1];
			if (compareVersions(version, minVersion) < 0) {
				error_reporter(`You are running Forge version ${version}, which is too old for this extension. Please update to at least ${minVersion} for guaranteed compatibility.`);
			}			
		} else {
			error_reporter(ERR_FORGE);
		}
	}
}

export function combineTestsWithModel(wheatText: string, tests: string): string {
	// If separator doesn't exist (in that case, look for #lang forge)
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



