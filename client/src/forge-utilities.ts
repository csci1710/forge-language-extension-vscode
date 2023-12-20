
// Returns only the predicates from the input text.
export function getPredicatesOnly(inputText : string) : string {
	const predicates = findForgePredicates(inputText);
	return predicates.join('\n');
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


	inputText = removeCStyleComments(inputText);
	inputText = removeInlineComments(inputText);

    const lines = inputText.split('\n');
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

