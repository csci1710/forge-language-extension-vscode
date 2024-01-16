 #Dev Guide

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
