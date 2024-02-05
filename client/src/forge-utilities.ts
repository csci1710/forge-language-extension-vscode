/*
	Utilites related to Forge syntax.
	Could change with Forge updates and/or a language server.
*/
/* Extracts a substring from a forge file */
function extractSubstring(text: string, startRow: number, startColumn: number, span: number): string {
	// Split the text into rows
	const rows = text.split("\n");
	
	// Validate if startRow and startColumn are within bounds
	if (startRow < 1 || startRow > rows.length) {
	  throw new Error("startRow is out of bounds.");
	}
	if (startColumn < 1 || startColumn > rows[startRow - 1].length + 1) {
	  throw new Error("startColumn is out of bounds.");
	}
	
	// Calculate the starting index
	let startIndex = rows.slice(0, startRow - 1).reduce((acc, currRow) => acc + currRow.length + 1, 0) + (startColumn - 1);
	
	// Extract and return the substring
	return text.substring(startIndex, startIndex + span);
  }

// Raise when an assertion is student predicates on both sides.
export class BothPredsStudentError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BothPredsStudentError';
	}
}

// Returns only the predicates from the input text.
export function getPredicatesOnly(inputText : string) : string {
	const predicates = findForgePredicates(inputText);
	return predicates.join('\n');
}


export function removeForgeComments(inputText: string): string {
	return removeInlineComments(removeCStyleComments(inputText));
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


export const quantified_assertion_regex = /\[.*:(\d+):(\d+) \(span (\d+)\)\]Theorem.*[ _]Assertion[ _](\w+)[ _]is[ _](\w+)[ _]for[ _](\w+)[ _]failed\./;
export const assertion_regex = /Theorem Assertion[ _](\w+)[ _]is[ _](\w+)[ _]for[ _](\w+)[ _]failed\./;
export const example_regex = /Invalid example '(\w+)'; the instance specified does not satisfy the given predicate\./;
export const test_regex = /Failed test (\w+)\./;


// s: student pred
// i: instructor pred
// AH, we should think of it in terms of constraining. So use ORs.
// If the student believes that s => i 
// then they believe that if s then i. So ease i to be { i or s }

// If the student believes that i => s,
// then they believe that if i then s. So constrict i to be { i AND s }

export function adjustWheatToStudentMisunderstanding(testFileName: string, w : string, student_preds : string, w_o : string) : string {
	const match = w_o.match(assertion_regex);
	const lhs_pred = match[1];
	const op = match[2];
	const rhs_pred = match[3];

	const isLhsInstructorAuthored = new RegExp(`\\b${lhs_pred}\\b`).test(w);
	const isRhsInstructorAuthored = new RegExp(`\\b${rhs_pred}\\b`).test(w); 


	if (isLhsInstructorAuthored && isRhsInstructorAuthored) {
		throw new Error("I cannot provide you with any more feedback, since both predicates in the in failing assertion were written by the instructor. For more feedback, be sure to directly reference only one predicate from the assignment statement.");
	}
	else if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {

		throw new BothPredsStudentError("I can only give feedback around assertions that directly reference at least one predicate from the assignment statement.");
	}

	w = w + "\n" + student_preds + "\n";

	// If the student believes that s => i 
	// then they believe that if s then i. So ease i to be { i or s }

	// If the student believes that i => s,
	// then they believe that if i then s. So constrain i to be { i AND s }
	if (isLhsInstructorAuthored) {

		// i is lhs
		// s is rhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// (ie i => s)
			return constrainPredicate(w, lhs_pred, rhs_pred)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie s => i
			return easePredicate(w, lhs_pred, rhs_pred)
		}
	}
	else {
		// i is rhs
		// s is lhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// ie s => i
			return easePredicate(w, rhs_pred, lhs_pred)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie i => s
			return constrainPredicate(w, rhs_pred, lhs_pred)
		}
	}
	throw new Error("Something went wrong!");
}


export function adjustWheatToQuantifiedStudentMisunderstanding(studentTests : string, w : string, student_preds : string, w_o : string) : string {
	const match = w_o.match(quantified_assertion_regex);
	
	const row = parseInt(match[1]);
	const col = parseInt(match[2]);
	const span = parseInt(match[3]);
	const lhs_pred = match[4];
	const op = match[5];
	const rhs_pred = match[6];


	

	// I think this is still correct, since the regex doesn't check any opening '['s.
	const isLhsInstructorAuthored = new RegExp(`\\b${lhs_pred}\\b`).test(w);
	const isRhsInstructorAuthored = new RegExp(`\\b${rhs_pred}\\b`).test(w); 


	if (isLhsInstructorAuthored && isRhsInstructorAuthored) {
		throw new Error("I cannot provide you with any more feedback, since both predicates in the in failing assertion were written by the instructor. For more feedback, be sure to directly reference only one predicate from the assignment statement.");
	}
	else if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {

		throw new BothPredsStudentError("I can only give feedback around assertions that directly reference at least one predicate from the assignment statement.");
	}

	w = w + "\n" + student_preds + "\n";


	var failing_test = extractSubstring( studentTests  , row, col, span).trim();

	const quantifier_match = /\bassert\b(.*?)\|/;
	const quantifier = failing_test.match(quantifier_match)[1].trim() + " | ";
	const lhs_match = /\|\b(.*?)\bis\b/;
	const lhs_instantiation = failing_test.match(lhs_match)[1].trim();
	const rhs_match = /\bfor\b(.*?)(\bfor\b|$)/;
	const rhs_instantiation = failing_test.match(rhs_match)[1].trim();
	


	// If the student believes that s => i 
	// then they believe that if s then i. So ease i to be { i or s }

	// If the student believes that i => s,
	// then they believe that if i then s. So constrain i to be { i AND s }
	if (isLhsInstructorAuthored) {

		// i is lhs
		// s is rhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// (ie i => s)
			return constrainPredicate(w, lhs_instantiation, rhs_instantiation, quantifier)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie s => i
			return easePredicate(w, lhs_instantiation, rhs_instantiation, quantifier)
		}
	}
	else {
		// i is rhs
		// s is lhs
		if (op == 'sufficient') {
			// User believes lhs => rhs
			// ie s => i
			return easePredicate(w, rhs_instantiation, lhs_instantiation, quantifier)

		} else if (op == 'necessary') {

			// User believes rhs => lhs
			// ie i => s
			return constrainPredicate(w, rhs_instantiation, lhs_instantiation, quantifier)
		}
	}
	throw new Error("Something went wrong!");
}

function constrainPredicate(w : string, i : string, s : string, quantifer_prefix : string = "") : string {
	const i_inner = i + "_inner";
	// User believes that i => s (ie if i then s).
	// So constrict i to be { i AND s }
	let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
	let added_pred =
		`
		pred ${i} { 
		 	${quantifer_prefix}	${i_inner} and ${s}
		}
		`
	return w_wrapped + added_pred;
}

export function constrainPredicateByExclusion(w : string, i : string, s : string, quantifer_prefix : string = "") : string {
	const i_inner = i + "_inner";
	// User believes that ! s => i, even thought s => i.
	// So constrict i to be { i AND !s }
	let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
	let added_pred =
		`
		pred ${i} { 
			${quantifer_prefix} ${i_inner} and not ${s}
		}
		`
	return w_wrapped + added_pred;
}

export function easePredicate(w : string, i : string, s : string, quantifer_prefix : string = "") : string {
	const i_inner = i + "_inner";
	// User believes that s => i (ie if s then i)
	// So ease i to be { i or s }
	let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
	let added_pred =
		`
		pred ${i} { 
			${quantifer_prefix} ${i_inner} or ${s}
		}
		`
	return w_wrapped + added_pred;
}

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
