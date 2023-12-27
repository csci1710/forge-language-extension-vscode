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
