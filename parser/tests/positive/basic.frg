#lang forge

open "some/path/file.forge" as fileAlias
open this.utils as utils

option verbose 5

sig Person {
  name: String,
  age: Int
}

abstract sig Animal {
  name: String
}

sig Dog extends Animal {
  breed: String
}


