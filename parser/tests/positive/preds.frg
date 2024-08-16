#lang forge


sig Node {
  key: one Int, 
  left: lone Node,
  right: lone Node
}

pred binary_tree {
	all x, y: Node | some x
	all n: Node | some n.left => n.left != n.right
}

