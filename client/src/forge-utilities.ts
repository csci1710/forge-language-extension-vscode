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
	const exampleRegex = /example\s+(\w+)\s+is\s+(?:{)?(.*?)(?:})?\s+for\s+{([\s\S]*)}/;
    let match;
    let examples = [];

    while ((match = exampleRegex.exec(fileContent)) != null) {
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


// Converts an example to a predicate reflecting the characteristics of the example.
export function exampleToPred(example, sigNames: string[], wheatPredNames : string[] ) : string {
	
	// Now we break the example into its bits ( examples name is {expr})
	// expr becomes a predicate, unless it already IS a predicate. p
	const exampleName = example.exampleName;
    const examplePredicate = example.examplePredicate;
    const exampleBody = example.exampleBody;

	if (!wheatPredNames.includes(examplePredicate)) {
		throw new Error("I provide feedbacl unless your example explicitly tests a predicate defined in the assignment.");
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
	
		lines.forEach(l => {

			var line = l.trim();
			if (line === '') return; // Skip empty lines
	
			isAssignmentContinued = assignmentContinued(line);
			if (isAssignmentContinued) {
				currentAssignment.value += ' ' + line.trim();
			} else
			{
				assignments.push({...currentAssignment});
				if (/^\s*\w+\s*=/.test(line)) {
					let parts = line.split('=');
					currentAssignment = { variable: parts[0].trim(), value: parts[1].trim() };
				} else {
					expressions.push(line);
				}
			}
		});
	
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