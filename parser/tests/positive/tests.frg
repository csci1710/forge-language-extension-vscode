#lang forge

check req_three_node_chain_unbalanced for 7 Node

test expect { 
  {not req_unique_root} for 7 Node is unsat 
}

inst myExample {
    // State = `State0 + `State1 + `State2 + `State3
}

assert req_three_node_chain_unbalanced {
  {binary_tree
   heights
  }
}

run { this } for 3 Node

