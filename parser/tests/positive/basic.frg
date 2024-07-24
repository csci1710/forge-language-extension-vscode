#lang forge

open "some/path/file.forge" as fileAlias
open this.utils as utils

option verbose 5

abstract sig Position {}
one sig Near extends Position {}
one sig Far extends Position {}

abstract sig Person { 
    time: one Int,
    shore: func State -> Position
}

one sig A extends Person {}
one sig B extends Person {}
one sig C extends Person {}
one sig D extends Person {}


sig State {
    next: lone State,
    torch: one Position,
    spent: one Int
}


