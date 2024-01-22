# Forge languager server 

Adapted from the [documented sample code](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)

## Functionality

This Language Server works for the language Forge. It has the following language features:
- Completions
- Diagnostics 

## Structure

```
.
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Running the extension

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder.
- Open VS Code on this folder.
- Compile the client and server.
  - Windows: Press Ctrl+Shift+B
  - MacOS: Press Cmd+Shift+B
- Switch to the Debug viewlet (i.e., click the play-button-with-bug icon in the bar that's usually present in the far left of the screen).
- Select `Launch Client` from the drop down.
- Click the play button next to the drop down to run the launch config.
  - (If you want to debug the server as well use the launch configuration `Attach to Server` instead.)
- In the `[Extension Development Host]`` instance of VSCode, open a document in 'Forge' language mode.
  - Enter Forge code. The extension will emit diagnostics for syntax errors.
  - Run Forge code with the run button. The extension will emit diagnostics for evaluation errors.


## HALP / Toadus Ponens

HALp is a 24 hour TA for the course, that helps students understand why their tests may not be consistent with the problem specification. It does so by running student tests against a correct implementation (`wheat`).

If a test fails and:

### Is an example, 

We are able to add hinting for examples that directly reference a wheat predicate (or its negation). We default to basic feedback (valid vs invalid) in all other cases.

1. We first generate a characteristic predicate for the wheat failing example (`e`). We do this by first separating the example into bounds imposed on (ie explicit assignments on) sigs, bounds imposed on relations (ie explicit assignments on relations), and expressions.  We then construct a characteristic predicate `s` as follows:

	- Each sig assignment of the form `X = X1 + X2` is converted to an existentially quantified expression : `some disj X1, X2 : X | `. 
	- All relational and expression-based assignments are placed inside these existential quantifiers.

2. We then modify the wheat `i` to a new predicate `i'` reflecting student belief as follows:
   - If `e` is a positive example, `i'` represents an easing of `i`. That is: `i' = {i OR s}`.
   - If `e` is a negative example, `i'` represents a constriction of `i`. That is: `i' = {i AND !s}`

We replace `i` with `i'` in the wheat, which is then run against an auto-grader, whose results are used to generate feedback.

### Is an assertion

We leverage the structure of implications to generate a mutation of the `wheat` that reflects the misconception embodied in the failing assertion.
Assertions are bound to 2 forms:

1. Student believes their predicate (`s`) implies an instructor predicate (`i`). We create a mutation of `i`, `i' =  { i or s }`

2. Student believes an instructor predicate (`i`) implies their predicate (`s`). We create a mutation of `i`, `i' =  { i and s }`

We replace `i` with `i'` in the wheat, which is then run against an auto-grader, whose results are used to generate feedback.

### Is a general `test expect`
We offer no help


In doing so, HALp does not focus on every potential mismatch between the `wheat` and the student's tests. Rather, it focuses on those deemed important by the instructor (as reflected in the autograder), and uses those to generate feedback.

Feedback on failing tests currently has to be instructor-provided. We suggest phrasing these hints as Socratic questions. Instructors must annotate each autograder test with corresponding question(s).

Logo available under creative commons : https://www.rawpixel.com/image/6864843/vector-sticker-public-domain-green

### Logging

| Event              | LogLevel | What is Logged                                                                                         | Triggered by  | Research Need                                                                        | Possible threats                                                                                                       |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| FORGE_RUN          | ERROR    | Open .frg file contents and error message                                                              | forge.RunFile | Maintainance -- logging forge launch failures                                        | None, beyond students leaking any information within their frg file.                                                   |
| FORGE_RUN_RESULT   | INFO     | RunId, and any errors on run                                                                           | forge.RunFile | Understanding student errors, can be correlated using RunId with Forge               | Error messages may include local paths on the student machine, students leaking any information within their frg file. |
| FORGE_RUN          | INFO     | RunId, contents of all .frg files open in VSCode                                                       | forge.RunFile | Record of what students run helps us understand student behavior.                    | None, beyond students leaking any information within their frg file.                                                   |
| ASSISTANCE_REQUEST | INFO     | {}                                                                                                     | forge.halp    | Understand frequency of when Toadus Ponens is invoked                                | None obvious                                                                                                           |
| HALP_RESULT        | INFO     | Open .test.frg contents, Toadus Ponens output presented to student                                     | forge.halp    | Understand the results students get from Toadus ponens.                              | None, beyond students leaking any information within their frg file.                                                   |
| AMBIGUOUS_TEST     | INFO     | Test file name, student tests, Forge output when test was run against the wheat                        | forge.halp    | Log test that may be in a space left ambiguous by the problem                        | Error messages may include local paths on the student machine, students leaking any information within their frg file. |
| FILE_DOWNLOAD      | ERROR    | Url of file being requested                                                                            | forge.halp    | Maintainance, understanding if students tried to use Toadus for other assignments    | None obvious                                                                                                           |
| CONCEPTUAL_MUTANT  | INFO     | <br>"testFileName","assignment", "student test file name", test_failure_message, conceptual_mutant<br> | forge.Halp    | Understand, store conceptual mutants produced by Toadus from assertions and examples | Error messages may include local paths on the student machine, students leaking any information within their frg file. |


### TODO

- HALP ignores bounds on tests, which may be complicated.
  