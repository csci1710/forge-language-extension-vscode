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
		throw new Error("I cannot provide you with any more feedback, since both predicates in the in failing assertion were written by the instructor. Please be sure to directly reference only one predicate from the assignment statement.");
	}
	else if (!isLhsInstructorAuthored && !isRhsInstructorAuthored) {
		throw new Error("I cannot provide you with any more feedback, since you authored both predicates in the assertion. Please be sure to directly reference one predicate from the assignment statement.");
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


