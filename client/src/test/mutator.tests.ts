import { Mutator } from '../mutator';
import { removeForgeComments } from '../forge-utilities';



import { strict as assert, strictEqual } from 'assert';

// TODO: This is duplicated, find a better place to put it.
export function combineTestsWithModel(wheatText: string, tests: string): string {
	// todo: What if separator doesn't exist (in that case, look for #lang forge)
	const TEST_SEPARATOR = "//// Do not edit anything above this line ////"
	const hashlang_decl = "#lang";

	if (tests.includes(TEST_SEPARATOR)) {
		const startIndex = tests.indexOf(TEST_SEPARATOR) + TEST_SEPARATOR.length;
		tests = tests.substring(startIndex).trim();
	}

	tests = tests.replace(hashlang_decl, "// #lang");

	var combined = wheatText + "\n" + tests;
	combined = removeForgeComments(combined);

	return combined;

}

function removeWhitespace(str: string): string {
	return str.replace(/\s/g, '');
}


const DIRTREE_INFO = {

	wheat: `#lang forge

				option run_sterling off

				sig Node {edges: set Node}

				pred isDirectedTree {
					edges.~edges in iden
					lone edges.Node - Node.edges 
					no (^edges & iden)
					lone Node or Node in edges.Node + Node.edges 
				}`,
	filename: "dirTree.frg",
}




// mutator constructor(wheat: string, student_tests: string, forge_output: string, test_file_name: string, source_text : string) {
describe('Mutator', () => {
	it(' : mutate to Misunderstanding carries out no mutations if there are no wheat failures.', () => {

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



	it(' : mutate to Misunderstanding ignores test expects for mutations.', () => {

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


	it(' : mutate to Misunderstanding ignores examples that do not directly reference a predicate.', () => {

		const tests = `
	  
	  	#lang forge

		open "${DIRTREE_INFO.filename}"
		//// Do not edit anything above this line ////
	 

	  
	  example someexamplename1 is {all t : Node | isDirectedTree } for {
		Node = \`Node1 + \`Node2
		no edges
	  }

	  pred anotherPred {
		  some edges
	  }

	  example someexamplename2 is anotherPred for {
		Node = \`Node1 
		no edges
	  }

	  `;
		const forge_output = "";
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentMisunderstanding();
		assert.strictEqual(mutator.num_mutations, 0);

		let outputs = mutator.error_messages;

		for (let output of outputs) {
			assert.strict(output.includes('someexamplename1') || output.includes('someexamplename'));
		}

	});

	it(' : mutate to Misunderstanding can mutate on multiple assertion failures.', () => {

		const tests = `
		
			#lang forge
  
		  open "${DIRTREE_INFO.filename}"
		  //// Do not edit anything above this line ////
	   

		  pred loops {
    
			(some (^edges & iden))
			}
	   
	   assert loops is necessary for isDirectedTree
	   
	   
	   pred mustHaveRoot {
	   
		   one edges.Node - Node.edges
	   }
	   
	   assert mustHaveRoot is necessary for isDirectedTree
		  `;
		const forge_output = `[hQNVMlZUHG.rkt:18:0 (span 44)] Theorem Assertion_loops_is_necessary_for_isDirectedTree failed. Found instance:
		#(struct:Sat (#hash((Node . ()) (edges . ()))) ((size-variables 388) (size-clauses 555) (size-primary 20) (time-translation 90) (time-solving 9) (time-building 1708532242901)) ()) Sterling disabled, so reporting raw instance data:
		#(struct:Sat (#hash((Node . ()) (edges . ()))) ((size-variables 388) (size-clauses 555) (size-primary 20) (time-translation 90) (time-solving 9) (time-building 1708532242901)) ())
		
		[hQNVMlZUHG.rkt:26:0 (span 51)] Theorem Assertion_mustHaveRoot_is_necessary_for_isDirectedTree failed. Found instance:
		#(struct:Sat (#hash((Node . ()) (edges . ()))) ((size-variables 390) (size-clauses 604) (size-primary 20) (time-translation 27) (time-solving 6) (time-building 1708532243034)) ()) Sterling disabled, so reporting raw instance data:
		#(struct:Sat (#hash((Node . ()) (edges . ()))) ((size-variables 390) (size-clauses 604) (size-primary 20) (time-translation 27) (time-solving 6) (time-building 1708532243034)) ())

		`;
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		let num_mutations = mutator.mutateToStudentMisunderstanding();



		const expectedMutant = `#lang forge

	  option run_sterling off
	  
	  sig Node {edges: set Node}
	  
	  pred isDirectedTree_inner1 {
		edges.~edges in iden 
		lone edges.Node - Node.edges 
		no (^edges & iden) 
		lone Node or Node in edges.Node + Node.edges 
	  }
	  
	  pred loops {
		   (some (^edges & iden))
	  }
	  pred mustHaveRoot {
	  
		  one edges.Node - Node.edges
	  }
	  
			pred isDirectedTree_inner2 { 
				 isDirectedTree_inner1 and loops
			}
			
			pred isDirectedTree { 
				 isDirectedTree_inner2 and mustHaveRoot
			}`;

		assert.strictEqual(num_mutations, 2);
		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expectedMutant));
	});

	it(' : mutate to Misunderstanding can mutate on quantified assertion failures.', () => {

		const tests = `
		#lang forge

//// Do not edit anything above this line ////

pred loops {
     (some (^edges & iden))
}

assert loops is necessary for isDirectedTree
assert all x : Node | loops is sufficient for isDirectedTree
		  `;
		const truncated_forge_output = `[aaa.test.frg:17:0 (span 44)] Theorem Assertion_loops_is_necessary_for_isDirectedTree failed. Found instance:
		#(struct:Sat (#hash((Node . ()) (edges . ()))) ((size-variables 388) (size-clauses 555) (size-primary 20) (time-translation 98) (time-solving 8) (time-building 1708545113557)) ()) Sterling disabled, so reporting raw instance data:
		#(struct:Sat (#hash((Node . ()) (edges . ()))) ((size-variables 388) (size-clauses 555) (size-primary 20) (time-translation 98) (time-solving 8) (time-building 1708545113557)) ())
		
		[aaa.test.frg:18:0 (span 60)] Theorem temporary-name_directedtree.test_1__Assertion_All_loops_is_sufficient_for_isDirectedTree failed. Found instance:
		#(struct:Sat (#hash(($x_all7045 . ((Node3))) (Node . ((Node1) (Node2) (Node3))) (edges . ((Node1 Node1) (Node1 Node3) (Node2 Node2) (Node2 Node3) (Node3 Node1) (Node3 Node2))))) ((size-variables 418) (size-clauses 388) (size-primary 24) (time-translation 34) (time-solving 7) (time-building 1708545113696)) ()) Sterling disabled, so reporting raw instance data:
		#(struct:Sat (#hash(($x_all7045 . ((Node3))) (Node . ((Node1) (Node2) (Node3))) (edges . ((Node1 Node1) (Node1 Node3) (Node2 Node2) (Node2 Node3) (Node3 Node1) (Node3 Node2))))) ((size-variables 418) (size-clauses 388) (size-primary 24) (time-translation 34) (time-solving 7) (time-building 1708545113696)) ())	`;
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, truncated_forge_output, DIRTREE_INFO.filename, source_text);
		let num_mutations = mutator.mutateToStudentMisunderstanding();



		const expectedMutant = `#lang forge

		option run_sterling off
		
		sig Node {edges: set Node}
		
		pred isDirectedTree_inner1 {
		 edges.~edges in iden 
		 lone edges.Node - Node.edges 
		 no (^edges & iden) 
		 lone Node or Node in edges.Node + Node.edges 
		}
		
		pred loops {
			 (some (^edges & iden))
		}
		
		   pred isDirectedTree_inner2 { 
			  isDirectedTree_inner1 and loops
		   }
		   
		   pred isDirectedTree { 
			all x : Node |  isDirectedTree_inner2 or loops
		   }`;

		assert.strictEqual(num_mutations, 2);
		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expectedMutant));
	});




	it(' : mutate to Misunderstanding carries out mutations on positive examples.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
			//// Do not edit anything above this line ////
		 
		  
		  example lasso is isDirectedTree for {
			Node = \`Node1 + \`Node2
			edges = \`Node1->\`Node2 + \`Node2->\`Node2
		  }
		  `;
		const forge_output = `[directedtree.test.frg:13:0 (span 168)] Invalid example 'lasso'; the instance specified does not satisfy the given predicate. Sterling disabled, so reporting raw instance data:
			#(struct:Unsat #f ((size-variables 0) (size-clauses 0) (size-primary 0) (time-translation 36) (time-solving 0) (time-building 1708545562033) (time-core 0)) unsat)
			`;
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);


		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentMisunderstanding();

		const expected_mutant = `
			#lang forge
			option run_sterling off

			  sig Node {edges: set Node}
			  
			  pred isDirectedTree_inner1 {
					  edges.~edges in iden
					  lone edges.Node - Node.edges 
					  no (^edges & iden)
					  lone Node or Node in edges.Node + Node.edges 
			  }
			  
			  
			  pred lasso {
				  some disj Node1, Node2 : Node | {
							  Node = Node1 + Node2
							  edges = Node1->Node2 + Node2->Node2
						  }
			  }
			  
			  pred isDirectedTree { 
			   isDirectedTree_inner1 or lasso
			  }`;

		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});


	it(' : mutate to Misunderstanding carries out mutations on negative examples.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
			//// Do not edit anything above this line ////
		 
		  
		  example line is {not isDirectedTree} for {
			Node = \`Node1 + \`Node2
			edges = \`Node1->\`Node2 
		  }
		  `;
		const forge_output = `[directedtree.test.frg:13:0 (span 168)] Invalid example 'line'; the instance specified does not satisfy the given predicate. Sterling disabled, so reporting raw instance data:
			#(struct:Unsat #f ((size-variables 0) (size-clauses 0) (size-primary 0) (time-translation 36) (time-solving 0) (time-building 1708545562033) (time-core 0)) unsat)
			`;
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);


		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentMisunderstanding();

		const expected_mutant = `
			#lang forge
			option run_sterling off

			  sig Node {edges: set Node}
			  
			  pred isDirectedTree_inner1 {
					  edges.~edges in iden
					  lone edges.Node - Node.edges 
					  no (^edges & iden)
					  lone Node or Node in edges.Node + Node.edges 
			  }
			  
			  
			  pred line {
				  some disj Node1, Node2 : Node | {
							  Node = Node1 + Node2
							  edges = Node1->Node2
						  }
			  }
			  
			  pred isDirectedTree { 
			   isDirectedTree_inner1 and not line
			  }`;

		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});

	it(' : mutate to Misunderstanding carries out mutations on examples and assertions when combined.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
			//// Do not edit anything above this line ////
		 
			pred mustBeEmpty {
				no edges
		    }
		   
		   assert mustBeEmpty is necessary for isDirectedTree
		  
		  example loop is {isDirectedTree} for {
			Node = \`Node1 + \`Node2
			edges = \`Node1->\`Node2  + \`Node2->\`Node1
		  }
		  `;
		const forge_output = `[directedtree.test.frg:21:19 (span 50)] Theorem Assertion_mustBeEmpty_is_necessary_for_isDirectedTree failed. Found instance:
			#(struct:Sat (#hash((Node . ((Node2) (Node3))) (edges . ((Node3 Node2))))) ((size-variables 390) (size-clauses 558) (size-primary 20) (time-translation 77) (time-solving 9) (time-building 1708555673207)) ()) Sterling disabled, so reporting raw instance data:
			#(struct:Sat (#hash((Node . ((Node2) (Node3))) (edges . ((Node3 Node2))))) ((size-variables 390) (size-clauses 558) (size-primary 20) (time-translation 77) (time-solving 9) (time-building 1708555673207)) ())
			
			[directedtree.test.frg:23:18 (span 114)] Invalid example 'loop'; the instance specified does not satisfy the given predicate. Sterling disabled, so reporting raw instance data:
			#(struct:Unsat #f ((size-variables 0) (size-clauses 0) (size-primary 0) (time-translation 5) (time-solving 0) (time-building 1708555673326) (time-core 0)) unsat)			
			`;
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);


		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentMisunderstanding();

		const expected_mutant = `#lang forge

			  option run_sterling off
			  
			  sig Node {edges: set Node}
			  
			  pred isDirectedTree_inner1 {
				edges.~edges in iden 
				lone edges.Node - Node.edges 
				no (^edges & iden) 
				lone Node or Node in edges.Node + Node.edges 
			  }
			  
			  pred mustBeEmpty {
					  no edges
			  }
			  
			  pred isDirectedTree_inner2 { 
				  isDirectedTree_inner1 and mustBeEmpty
			  }
					
			  pred loop {
				  some disj Node1, Node2 : Node | {
					  Node = Node1 + Node2
					  edges = Node1->Node2  + Node2->Node1
				  }
			  }
			  
			  pred isDirectedTree { 
				  isDirectedTree_inner2 or loop
			  }`;

		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});




	// TODO: MutateToStudentUnderstanding here


	/*
		Test cases:
		- [x] Mutate to positive examples ( I suspect multiple examples will be an issue?)
		- [x] Mutate to negative examples
		- [x] Mutate to assertions
		- Mutate to quantified assertions

		- Mutate to example + assertion + quantified assertion

	*/

	it(' : mutate to Understanding carries out no mutations if not in test suites.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
//// Do not edit anything above this line ////
		 
				example e1 is isDirectedTree for {
					Node = \`Node1 + \`Node2
					edges = \`Node1->\`Node2
				}

				example e2 is isDirectedTree for {
					Node = \`Node1 + \`Node2 + \`Node3
					edges = \`Node2->\`Node1 + \`Node2->\`Node3
				}
		  `;
		const forge_output = "";
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentUnderstanding();

		const expected_mutant = `#lang forge`

		assert.strictEqual(mutator.num_mutations, 0);
	});


	it(' : mutate to Understanding carries mutations on examples.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
			//// Do not edit anything above this line ////
		 
			test suite for isDirectedTree {
				example e1 is isDirectedTree for {
					Node = \`Node1 + \`Node2
					edges = \`Node1->\`Node2
				}

				example e2 is isDirectedTree for {
					Node = \`Node1 + \`Node2 + \`Node3
					edges = \`Node2->\`Node1 + \`Node2->\`Node3
				}
			}
		  `;
		const forge_output = "";
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentUnderstanding();

		const expected_mutant = `
			#lang forge

			option run_sterling off

			sig Node {edges: set Node}

			pred isDirectedTree_inner1 {
					edges.~edges in iden
					lone edges.Node - Node.edges 
					no (^edges & iden)
					lone Node or Node in edges.Node + Node.edges 
			}

			pred e1 {
				some disj Node1, Node2 : Node | {
						Node = Node1 + Node2
						edges = Node1->Node2
						}
				}
        
			pred e2 {
				some disj Node1, Node2, Node3 : Node | {
					Node = Node1 + Node2 + Node3
					edges = Node2->Node1 + Node2->Node3
					}
			}

			pred isDirectedTree_inner2 { 
						isDirectedTree_inner1 and not e1
			}

			pred isDirectedTree { 
						isDirectedTree_inner2 and not e2
			}
			`;

		assert.strictEqual(mutator.num_mutations, 2);
		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});


	it(' : mutate to Understanding carries mutations on assertions.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
			//// Do not edit anything above this line ////
		 

			pred a1 {
				no (^edges & iden)
			}

			pred a2 {
				edges.~edges in iden 
			}


			test suite for isDirectedTree {
				assert a1 is necessary for isDirectedTree
				assert a2 is necessary for isDirectedTree
			}
		  `;
		const forge_output = "";
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentUnderstanding();

		const expected_mutant = `
			#lang forge

			option run_sterling off
	
			sig Node {edges: set Node}
	
			pred isDirectedTree_inner1 {
					edges.~edges in iden
					lone edges.Node - Node.edges 
					no (^edges & iden)
					lone Node or Node in edges.Node + Node.edges 
			}
	
	pred a1 {
			no (^edges & iden)
	}
	pred a2 {
			edges.~edges in iden 
	}
	
	pred isDirectedTree_inner2 { 
			 isDirectedTree_inner1 and not ( isDirectedTree_inner1 => a1)
	}
	
	pred isDirectedTree { 
			 isDirectedTree_inner2 and not ( isDirectedTree_inner2 => a2)
	}
			`;

		assert.strictEqual(mutator.num_mutations, 2);
		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});



	// TODO: Negative ex
	it(' : mutate to Understanding carries out mutations on negative examples.', () => {

		const tests = `
		  
			#lang forge
	
			open "${DIRTREE_INFO.filename}"
//// Do not edit anything above this line ////
		 
		  test suite for isDirectedTree {
			example lasso is !isDirectedTree for {
				Node = \`Node1 + \`Node2
				edges = \`Node1->\`Node2 + \`Node2->\`Node2
			}

			example loop is {not isDirectedTree} for {
				Node = \`Node1 + \`Node2
				edges = \`Node1->\`Node2  + \`Node2->\`Node1
			}
		}
		  `;
		const forge_output = ``;
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);


		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentUnderstanding();

		const expected_mutant = `
			                  
#lang forge

option run_sterling off

sig Node {edges: set Node}

pred isDirectedTree_inner1 {
        edges.~edges in iden
        lone edges.Node - Node.edges 
        no (^edges & iden)
        lone Node or Node in edges.Node + Node.edges 
}

pred lasso {
some disj Node1, Node2 : Node | {


Node = Node1 + Node2
edges = Node1->Node2 + Node2->Node2

}

}
pred loop {
some disj Node1, Node2 : Node | {


Node = Node1 + Node2
edges = Node1->Node2  + Node2->Node1

}

}
pred isDirectedTree_inner2 { 
 isDirectedTree_inner1 or lasso
}

pred isDirectedTree { 
 isDirectedTree_inner2 or loop
}`;
		assert.strictEqual(mutator.num_mutations, 2);
		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});



	it(' : mutate to Understanding carries mutations on quantified assertions.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
			//// Do not edit anything above this line ////
		 
			// sufficient
			pred a1[r : Node] {
				one Node
				r->r not in edges
			}

			// necessary
			pred a2[n : Node] {
				n not in (^edges & iden)
			}


			test suite for isDirectedTree {
				assert all x : Node | a1[x] is sufficient for isDirectedTree
				assert all x : Node | a2[x] is necessary for isDirectedTree
			}
		  `;
		const forge_output = "";
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentUnderstanding();

		const expected_mutant = `
			#lang forge

option run_sterling off

sig Node {edges: set Node}

pred isDirectedTree_inner1 {
        edges.~edges in iden
        lone edges.Node - Node.edges 
        no (^edges & iden)
        lone Node or Node in edges.Node + Node.edges 
}

pred a1[r : Node] {
        one Node
        r->r not in edges
}
pred a2[n : Node] {
        n not in (^edges & iden)
}

pred isDirectedTree_inner2 { 
                isDirectedTree_inner1 and not (all x : Node | a1[x] => isDirectedTree_inner1)
}

pred isDirectedTree { 
                isDirectedTree_inner2 and not (all x : Node | isDirectedTree_inner2 => a2[x])
}
			`;

		assert.strictEqual(mutator.num_mutations, 2);
		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});



	it(' : mutate to Understanding carries mutations out when tests are of various types.', () => {

		const tests = `
		  
			  #lang forge
	
			open "${DIRTREE_INFO.filename}"
			//// Do not edit anything above this line ////
		 
			// sufficient
			pred a1[r : Node] {
				one Node
				r->r not in edges
			}

			pred a2 {
				edges.~edges in iden 
			}

			example willBeIgnored is isDirectedTree for {
				Node = \`Node1
				no edges
			}

			test suite for isDirectedTree {
				assert all x : Node | a1[x] is sufficient for isDirectedTree
				assert a2 is necessary for isDirectedTree


				example lasso is !isDirectedTree for {
					Node = \`Node1 + \`Node2
					edges = \`Node1->\`Node2 + \`Node2->\`Node2
				}


			}
		  `;
		const forge_output = "";
		const source_text = combineTestsWithModel(DIRTREE_INFO.wheat, tests);

		const mutator = new Mutator(DIRTREE_INFO.wheat, tests, forge_output, DIRTREE_INFO.filename, source_text);
		mutator.mutateToStudentUnderstanding();


		const expected_mutant = `#lang forge

option run_sterling off

sig Node {edges: set Node}

pred isDirectedTree_inner1 {
        edges.~edges in iden
        lone edges.Node - Node.edges 
        no (^edges & iden)
        lone Node or Node in edges.Node + Node.edges 
}

pred a1[r : Node] {
        one Node
        r->r not in edges
}
pred a2 {
    edges.~edges in iden 
}
pred lasso {
        some disj Node1, Node2 : Node | {
                Node = Node1 + Node2
                edges = Node1->Node2 + Node2->Node2
        }
}

pred isDirectedTree_inner2 { 
        isDirectedTree_inner1 or lasso
}

pred isDirectedTree_inner3 { 
        isDirectedTree_inner2 and not ( isDirectedTree_inner2 => a2)
}

pred isDirectedTree { 
        isDirectedTree_inner3 and not (all x : Node | a1[x] => isDirectedTree_inner3)
}
			`;

		assert.strictEqual(mutator.num_mutations, 3);
		assert.strictEqual(removeWhitespace(mutator.mutant), removeWhitespace(expected_mutant));
	});


});


