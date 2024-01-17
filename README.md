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


## HALP

HALp is a 24 hour TA for the course, that helps students understand why their tests may not be consistent with the problem specification. It does so by running student tests against a correct implementation (`wheat`).

If a test fails and:

-  is an example, HALp lets users know that the example is invalid.
-  is a general `test expect``, HALp offers no help.
-  is an assertion, HALp leverages the structure of implications to generate a mutation of the `wheat` that reflects the misconception embodied in the failing assertion. 
   -  This is then run against an auto-grader, whose results are used to generate feedback.

In doing so, HALp does not focus on every potential mismatch between the `wheat` and the student's tests. Rather, it focuses on those deemed important by the instructor (as reflected in the autograder), and uses those to generate feedback.

Feedback on failing tests currently has to be instructor-provided. We suggest phrasing these hints as Socratic questions. Instructors must annotate each autograder test with corresponding question(s).

Logo available under creative commons : https://www.rawpixel.com/image/6864843/vector-sticker-public-domain-green