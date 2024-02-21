import { Mutator } from '../mutator';
//import { combineTestsWithModel } from '../halp';


import { strict as assert } from 'assert';



function combineTestsWithModel(wheatText: string, tests: string) : string {
	// todo: What if separator doesn't exist (in that case, look for #lang forge)
	const TEST_SEPARATOR = "//// Do not edit anything above this line ////"
	const hashlang_decl = "#lang";

	if (tests.includes(TEST_SEPARATOR)) {
		const startIndex = tests.indexOf(TEST_SEPARATOR) + TEST_SEPARATOR.length;
		tests = tests.substring(startIndex).trim();
	}
	// else if (studentAuthored) {
	// 	const errStr = `Format error in your test file. Did you edit anything above the comment '${TEST_SEPARATOR}' or remove this comment?`;
	// 	vscode.window.showErrorMessage(errStr);
	// 	throw new Error(errStr);
	// }
	// Remove any potentially accidentally left in #lang defs
	tests = tests.replace(hashlang_decl, "// #lang");
	return wheatText + "\n" + tests;
}

function removeWhitespace(str: string): string {
	return str.replace(/\s/g, '');
}


const DIRTREE_INFO = {

	wheat : `#lang forge

				option run_sterling off

				sig Node {edges: set Node}

				pred isDirectedTree {
					edges.~edges in iden -- Injective, each child has at most one parent
					lone edges.Node - Node.edges -- At most one element that does not have a parent
					no (^edges & iden) -- No loops
					lone Node or Node in edges.Node + Node.edges -- Either one node or every node has either a child or a parent.
				}`,
	filename : "dirTree.frg",

	

	}




// mutator constructor(wheat: string, student_tests: string, forge_output: string, test_file_name: string, source_text : string) {
describe('Mutator', () => {
	it('carries out no mutations if there are no wheat failures.', () => {

	  const tests = `
	  
	  	#lang forge

		open "${DIRTREE_INFO.filename}"
		//// Do not edit anything above this line ////
	 
	  test expect {
		injective : {isDirectedTree implies (edges.~edges in iden)} is theorem
		injective_insufficient : {(edges.~edges in iden) and !isDirectedTree} is sat
	  
		root : {isDirectedTree implies (lone edges.Node - Node.edges) } is theorem
		loopless : {isDirectedTree implies (no (^edges & iden))} is theorem
		connected : {isDirectedTree implies (lone Node or Node in edges.Node + Node.edges) } is theorem
	  }
	  
	  example twoNodeTree is isDirectedTree for {
		Node = \`Node1 + \`Node2
		edges = \`Node1->\`Node2
	  }
	  `;
	const forge_output = "";
	const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

	const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
	mutator.mutateToStudentMisunderstanding();

	
	assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(DIRTREE_INFO.wheat));
	});
  


	it('ignores test expects for mutations.', () => {

		const tests = `
		
			#lang forge
  
		  open "${DIRTREE_INFO.filename}"
		  //// Do not edit anything above this line ////
	   
		test expect {
		  contradiction : {isDirectedTree and !isDirectedTree } is sat
		}`;
	  const forge_output = "";
	  const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);
  
	  const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
	  mutator.mutateToStudentMisunderstanding();
  
	  
	  assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(DIRTREE_INFO.wheat));
	  });


	
  });
