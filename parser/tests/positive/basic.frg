#lang forge

abstract sig Position {}

abstract sig Person { 
    time: one Int,
    shore: func State -> Position
}

one sig Near extends Position {}
one sig Far extends Position {}

one sig A extends Person {}
one sig B extends Person {}
one sig C extends Person {}
one sig D extends Person {}


sig State {
    next: lone State,
    torch: one Position,
    spent: one Int
}

one sig Ollie {}

pred heon[ziao: Int] {
    some Ollie | ziao
}

