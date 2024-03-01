
# Contributing

- Pushes to `main` result in direct deployment to the VS Marketplace. Pull requests to `main`, therefore must change the package version number.
- All pull requests adding features should be made to `dev`. 
- **DO NOT** make pull requests directly to `main` unless you are deploying a hotfix.
- Merge dev to master as follows:
  - `git checkout -b staging-branch origin/main`
  - `git merge -ff dev`
  - Now create a pull request from `staging branch` to `main`

# Finding your way around


## What's in the folder

* This folder contains all of the files necessary for your extension.
* `package.json` - this is the manifest file in which you declare your extension and command.



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


## Get up and running straight away
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



* Press `F5` to open a new window with your extension loaded.


## Compile to VSIX


Make sure you have the following Node.js package installed.
```
npm install -g @vscode/vsce
```

Now run:
```
vsce package
```

The associated VSIX file represents the extension. **DO NOT** publish this extension to the VSCode marketplace.

You can install the extension following rules here: https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix

