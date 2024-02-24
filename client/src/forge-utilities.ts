
import {spawn } from 'child_process';
import * as fs from 'fs';
import { tempFile } from './gen-utilities';


/*
	Utilites related to Forge syntax.
	Could change with Forge updates and/or a language server.
*/


// Returns only the predicates from the input text.
export function getPredicatesOnly(inputText : string) : string {
	const predicates = findForgePredicates(inputText);
	return predicates.join('\n');
}


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


// Need to test this, but hopefully works.
function findForgePredicates(inputText : string) : [string] {
	const withoutComments = removeForgeComments(inputText);
    const lines = withoutComments.split('\n');
    let inPredicate = false;
    let braceLevel = 0;
    let currentPredicate = '';
    let predicates : [string] = [''];

    for (let line of lines) {
        if (inPredicate) {
            currentPredicate += line + '\n';
            braceLevel += (line.match(/\{/g) || []).length;
            braceLevel -= (line.match(/\}/g) || []).length;

            if (braceLevel === 0) {
                predicates.push(currentPredicate.trim());
                currentPredicate = '';
                inPredicate = false;
            }
        } else {
            const match = line.match(/\bpred\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(\[(.*?)\])?\s*\{/);
            if (match) {
                inPredicate = true;
                braceLevel = 1;
                currentPredicate = line + '\n';
            }
        }
    }

    return predicates;
}


export function findForgeExamples(inputText) {
    const withoutComments = removeForgeComments(inputText);
    const lines = withoutComments.split('\n');
    let inExample = false;
    let braceLevel = 0;
    let currentExample = '';
    let examples = [];

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



export function getSigList(s : string) : string[] {
	const pattern = /\bsig\s+(\w+)/g;
    var matches = [];
    var match;
    while ((match = pattern.exec(s)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

export function getPredList(fileContent: string): string[] {
	const predicateRegex = /\bpred\s+(\w+)(\s|\{|\[)/g;
	const predicates: string[] = [];
	let match;

	while ((match = predicateRegex.exec(fileContent)) !== null) {
		const predicateName = match[1];
		predicates.push(predicateName);
	}

	return predicates;
}

export function findAllExamples(fileContent : string) {
	// TODO: A language server would help us not have to write these long (possibly buggy) regexes.
	const exampleRegex = /example\s+(\w+)\s+is\s+(?:{)?(.*?)(?:})?\s+for\s+{([\s\S]*)}/g;
 

	let examples = [];
	let matches = fileContent.matchAll(exampleRegex);

	for (const match of matches){
        const exampleName = match[1];
        const examplePredicate = match[2].trim();
        const exampleBody = match[3].trim();

        examples.push({
            exampleName,
            examplePredicate,
            exampleBody
        });
    }
    return examples;
}

export function findAllAssertions(fileContent : string) {
	const assertRegex = /assert\s+(\w+)\s+is\s+(necessary|sufficient)\s+for\s+(\w+)/g;


    let assertions = [];
	let matches = fileContent.matchAll(assertRegex);

    for (const match of matches){
        const assertionName = `Assert ${match[1]} is ${match[2]} for ${match[3]}`;
        const lhs = match[1].trim();
		const op = match[2].trim();
        const rhs = match[3].trim();

        assertions.push({
            assertionName,
            lhs,
			op,
            rhs
        });
    }
    return assertions;
}


export function findAllQuantifiedAssertions(fileContent : string) {
	// TODO: Fix!! This regex is not working.
	const quantifiedAssertRegex = /assert\s+all([\s\S]+?)\|\s*(\w+)\s+is\s+(necessary|sufficient)\s+for\s+(\w+)/gs;

	if (fileContent == null || fileContent == "") {
		return [];
	}


    let assertions = [];
	let matches  = fileContent.matchAll(quantifiedAssertRegex);

    for (const match of matches){
        
		const quantifiedVars = match[1].trim();
        const lhs = match[2].trim();
		const op = match[3].trim();
        const rhs = match[4].trim();


		const assertionName = `Assert All ${lhs} is ${op} for ${rhs}`;

        assertions.push({
            assertionName,
			quantifiedVars,
            lhs,
			op,
            rhs
        });
    }
    return assertions;
}





export function findExampleByName(fileContent : string, exampleName: string) {
	
	// HACK: We first isolate examples and then parse the correct one because I was
	// having trouble with the regex. A language server would help.
	const all_examples = findForgeExamples(fileContent);
	const r = new RegExp(`\\b${exampleName}\\b`);
	var to_search = all_examples.filter(e => r.test(e))[0];

	const exampleRegex = new RegExp(`example\\s+${exampleName}\\s+is\\s+(?:{)?([\\s\\S]*?)(?:})?\\s+for\\s+{([\\s\\S]*)}`);
	const match = exampleRegex.exec(to_search);

	if (match == null) {
		return null;
	}

	const examplePredicate = match[1].trim();
	const exampleBody = match[2].trim();
	return {
		exampleName,
		examplePredicate,
		exampleBody
	};
}


export function assertionToExpr(lhs, rhs, op, quantifier_prefix = "") : string {


	if (op == "sufficient") {
		return `(${quantifier_prefix} ${lhs} => ${rhs})`;
	}
	else if (op == "necessary") {
		return `(${quantifier_prefix} ${rhs} => ${lhs})`;
	}
	else {
		throw new Error("Invalid op");
	}
}


// Converts an example to a predicate reflecting the characteristics of the example.
export function exampleToPred(example, sigNames: string[], wheatPredNames : string[] ) : string {
	
	// Now we break the example into its bits ( examples name is {expr})
	// expr becomes a predicate, unless it already IS a predicate. p
	const exampleName = example.exampleName;
    const examplePredicate = example.examplePredicate;
    const exampleBody = example.exampleBody;

	if (!wheatPredNames.includes(examplePredicate)) {
		throw new Error("I provide feedback unless your example explicitly tests a predicate defined in the assignment.");
	}


	function extractAssignments() {

		function assignmentContinued(x : string)  {
			let t = x.replace(/\(/g, "").replace(/\)/g, "")
					.replace(/\{/g, "").replace(/\}/g, "").trim();
			return t.startsWith("`") || t.startsWith("->") || t.startsWith(",") || t.startsWith("+");
		}


		const lines = exampleBody.split('\n');
		let expressions = [];
		let assignments = [];
		
		let currentAssignment = { variable: '', value: '' };
		let isAssignmentContinued = false;
	
		for (var l of lines) {
			var line = l.trim();
			if (line == '') {
				continue
			} 
	
			isAssignmentContinued = assignmentContinued(line);
			if (isAssignmentContinued) {
				currentAssignment.value += ' ' + line.trim();
			} else
			{
				assignments.push({...currentAssignment});
				if (/^\s*\w+\s*=/.test(line)) {
					let parts = line.split('=');
					const lhs = parts[0].trim();
					const rhs = parts[1].trim();
					currentAssignment = { variable: lhs, value: rhs };
					isAssignmentContinued = true;
				} else {
					expressions.push(line);
				}
			}
		};
	

		if (isAssignmentContinued) {
			assignments.push({...currentAssignment});
		}
		return [assignments, expressions];
	}

	function sigToExpr(assignment) {
		const atom_name = assignment.variable;
		var atom_rhs = assignment.value.replace(/`/g, '');
		const atom_rhs_list = atom_rhs
			.replace(/\s+|\n|\r/g, '') // Replace all whitespace, newline, or return with empty string
			.replace(/\+/g, ' ')
			.replace(/->/g, ' ')
			.split(' ').map(item => item.trim());

		// Remove any elements that are in sigNames
		const atom_rhs_set = new Set(atom_rhs_list.filter(item => !sigNames.includes(item)));
		// Remove any duplicates
		const atom_rhs_comma_sep = Array.from(atom_rhs_set).join(', ');

		var quantifier = "";
		var constraint = "";
		if (atom_rhs_comma_sep != '') {
		 quantifier = sigNames.includes(atom_name) ? `some disj ${atom_rhs_comma_sep} : ${atom_name} | {\n` : '';
		 constraint = `${atom_name} = ${atom_rhs}`;
		}

		return {
			quantifier,
			constraint
		};
	}

	
	const [assignments, expressions] = extractAssignments();

	// All the expressions go on the outside.
	const expressionString = expressions.join('\n');
	const sigExpressions = assignments.map(sigToExpr);
	const sigQuantifiers = sigExpressions.map(a => a.quantifier).filter(a => a != '');
	const sigQuantifiersAsString = sigQuantifiers.join("\n");
	const sigConstraints = sigExpressions.map(a => a.constraint).join("\n");
	const sigAssignmentsPostfix = '}'.repeat(sigQuantifiers.length) + "\n";

	// We need to put ALL the assignments on sigs on the outside, and then expressions and relations inside.
		/*
			some disj ${atom_rhs_comma_sep} : ${atom_name} | {
				${atom_name} = ${atom_rhs}
					.... etc
				expressions
				relations
			}
		*/
	// TODO: ISSUE: What if the example has a some disj quantifier in its body? That would break this.
	const exampleAsPred = `pred ${exampleName} {
		${sigQuantifiersAsString}
		${sigConstraints}
		${expressionString}
		${sigAssignmentsPostfix}
	}`;

	return exampleAsPred;
}



export function getFailingTestNames(o: string): string[] {

	let lines = o.split("\n");
	return lines.map(getFailingTestName).filter((x) => x != "");
}


export function getFailingTestName(o: string): string {
	if (quantified_assertion_regex.test(o)) {
		const match = o.match(quantified_assertion_regex);
		const lhs_pred = match[4];	
		const op = match[5];
		const rhs_pred = match[6];
		return "Assertion All " + lhs_pred + " is " + op + " for " + rhs_pred;

	} else if (assertion_regex.test(o)) {
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




export function findAllStructuredTests(suite: string) {


	var examples = findAllExamples(suite);
	var assertions = findAllAssertions(suite);
	var quantifiedAssertions = findAllQuantifiedAssertions(suite);

	return {examples, assertions, quantifiedAssertions};
}
  

// TODO: THis is not quite correct! It's not finding the test suites.
export function extractTestSuite(input: string): ExtractedTestSuite[] {
	
	const results: ExtractedTestSuite[] = [];



	// Need to keep getting the input string in
	function findTestSuiteIndices(input: string) : Object[] {


		const indices : Object[] = [];
		if (input.length == 0 || input == null) {
			return indices;
		}

		const pattern = /test\s+suite\s+for\s+(\w+)\s*\{/g;
		const matches = Array.from(input.matchAll(pattern));




		let suiteEnd = 0;
		// This only catches the first one.
		// Now there is a second one.

		for (const match of matches) {
			const startIndex = match.index;
			const endIndex = startIndex + match[0].length;
			const pred = match[1];
			
			if (startIndex !== undefined && endIndex !== undefined) {
				
				var to_search = input.substring(endIndex);
				// Search till you find a matched closing brace.

				var i = endIndex + 1;
				var s = "{";

				while (!isBalancedBraces(s) && i < input.length) {
					s += input[i]
					i++;
				}

				suiteEnd = i;
				
				if (isBalancedBraces(s)) {
				// These include braces though!!
					s = s.trim();
					s = s.substring(1, s.length - 1); // Remove first and last characters '{' and '}'
					indices.push({pred, s});
				}
			}
		}
		const remaining = input.substring(suiteEnd);
		const next = findTestSuiteIndices(remaining)
		return indices.concat(next);
	}
	  
	//const pattern = /test suite for\s+(\w+)\s*\{(.*)\}/gs;
	let identifiedSuites = findTestSuiteIndices(input);

  
	for (const suite of identifiedSuites) {
	  const predicateName = suite['pred'];
	  const content = suite['s'];

		let ts: ExtractedTestSuite = {
			predicateName: predicateName,
			tests: findAllStructuredTests(content)
			};

	    results.push(ts);
	}
  
	return results;
}
  
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
		const forgeVersionRegex = /Forge version: (\d+\.\d+\.\d+)/;
		const match = stdout.match(forgeVersionRegex);
		if (match) {
			let version = match[1];
			if (compareVersions(version, minVersion) < 0) {
				error_reporter(`You are running Forge version ${version}, which is too old for this extension. Please update to at least ${minVersion} for guaranteed compatibility.`);
			}			
		} else {
			error_reporter(ERR_FORGE);
		}
	}
}