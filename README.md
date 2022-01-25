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

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a document in 'Forge' language mode.
  - Enter Forge code. The extension will emit diagnostics for syntax errors.
  - Run Forge code with the run button. The extension will emit diagnostics for evaluation errors.
