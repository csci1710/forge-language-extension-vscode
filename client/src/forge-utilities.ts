/*
	Utilites related to Forge syntax.
	Could change with Forge updates and/or a language server.
*/

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


export const assertion_regex = /Theorem Assertion (\w+) is (\w+) for (\w+) failed\./;
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


function constrainPredicate(w : string, i : string, s : string) : string {
	const i_inner = i + "_inner";
	// User believes that i => s (ie if i then s).
	// So constrict i to be { i AND s }
	let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
	let added_pred =
		`
		pred ${i} { 
			${i_inner} 
			${s}
		}
		`
	return w_wrapped + added_pred;
}

function easePredicate(w : string, i : string, s : string) : string {
	const i_inner = i + "_inner";
	// User believes that s => i (ie if s then i)
	// So ease i to be { i or s }
	let w_wrapped = w.replace(new RegExp("\\b" + i + "\\b", 'g'), i_inner);
	let added_pred =
		`
		pred ${i} { 
			${i_inner} or ${s}
		}
		`
	return w_wrapped + added_pred;
}






export function getSigList(s : string) : string[] {
	const sigs = s.match(/sig\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(\[(.*?)\])?\s*\{/g);
	if (sigs == null) {
		return [];
	}
	const sigNames = sigs.map(sig => sig.split(' ')[1].split('[')[0]);
	return sigNames;
}


/*
example diagonalPasses is {some brd: Board | winningDiag[brd, X] } for {
  Board = `Board0
  X = `X0 
  O = `O0
  A = `A0 
  B = `B0 
  C = `C0
  inverse = A->C + B->B + C->A
  places = Board -> (A -> A + B -> B + C -> C ) -> X
}
*/
export function findAllExamples(fileContent : string) {
    const exampleRegex = /example\s+(\w+)\s+is\s+(?:{)?(.*?)(?:})?\s+for\s+{([\s\S]*)}/;
    let match;
    let examples = [];

    while ((match = exampleRegex.exec(fileContent)) !== null) {
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

// Converts an example to a predicate reflecting the characteristics of the example.
export function exampleToPred(example, sigNames: string[], wheatPredNames : string[] ) : string {
	
	// Now we break the example into its bits ( examples name is {expr})
	// expr becomes a predicate, unless it already IS a predicate. p
	const exampleName = example.exampleName;
    const examplePredicate = example.examplePredicate;
    const exampleBody = example.exampleBody;


	if (!wheatPredNames.includes(examplePredicate)) {
		// examplePred is not in wheatPredNames
		// 	// (what do we do for negative examples that have failed the wheat? Well, the hint is clear : this *is* an instance.)

		// Cannot really provide help for now :(
			throw new Error("Some message about how we cannot help unless it is a positive example explicitly testing a predicate defined in the assignment.");
	}

	// examplePred directly tests a wheat predicate

	// Returns a list of form :  [{variable: 'Board', value: '`Board0'}]
	function extractAssignments() {
		// Split the instance string into lines
		const lines = exampleBody.split('\n');
		let assignments = [];
		let currentAssignment = { variable: '', value: '' };
		let isAssignmentContinued = false;
	
		lines.forEach(line => {
			if (line.trim() === '') return; // Skip empty lines
	
			// Check if line is the start of a new assignment
			if (/^\s*\w+\s*=/.test(line)) {
				if (isAssignmentContinued) {
					// Add the previous assignment to the list
					assignments.push({...currentAssignment});
				}
				// Start a new assignment
				let parts = line.split('=');
				currentAssignment = { variable: parts[0].trim(), value: parts[1].trim() };
				isAssignmentContinued = true;
			} else if (isAssignmentContinued) {
				// Continuation of the current assignment
				currentAssignment.value += ' ' + line.trim();
			}
		});
	
		// Add the last assignment if there is one
		if (isAssignmentContinued) {
			assignments.push({...currentAssignment});
		}
	
		return assignments;
	}




	// Converts every sig assignment into a predicate	
	// But what about the explicit relations here. We want to capture those too.
	// Node = `A + `B should become:
	// some disj a, b : Node | Node = a + b 
	function sigToExpr(assignment): string {
		const atom_name = assignment.variable;
		var atom_rhs = assignment.value.replace(/`/g, '');
		const atom_rhs_list = atom_rhs
			.replace(/\s+|\n|\r/g, '') // Replace all whitespace, newline, or return with empty string
			.replace('+', ' ')
			.replace('->', ' ')
			.split(' ').map(item => item.trim());

		// Remove any elements that are in sigNames
		const atom_rhs_set = new Set(atom_rhs_list.filter(item => !sigNames.includes(item)));
		// Remove any duplicates
		const atom_rhs_comma_sep = Array.from(atom_rhs_set).join(', ');

		return `some disj ${atom_rhs_comma_sep} : ${atom_name} | ${atom_name} = {${atom_rhs_comma_sep}}
		`;
	}

	
	const assignments = extractAssignments();
	const sigExpressions = assignments.map(sigToExpr);
	const sigExpressionsString = sigExpressions.join('\n');

	const exampleAsPred = `pred ${exampleName} {
		 ${sigExpressionsString}
		}
		`;

	return exampleAsPred;

	// Now we have sufficiency: sigExpressions => examplePredicate 

	// Now, how do we translate this to intent/ wheat

	
	return "";
	}

	// (what do we do for negative examples that have failed the wheat? Well, the hint is clear : this *is* an instance.)
	
	// Now we have sufficiency: p_bounds => p 

	// Now, how do we translate this to intent/ wheat




	return "";
}