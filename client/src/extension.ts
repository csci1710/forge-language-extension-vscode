import * as path from 'path';
import * as vscode from 'vscode';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

function getTerminal(fileURI: string): vscode.Terminal | null {
	const terms = (<any>vscode.window).terminals;
	const termLength = terms.length;
	for (let i = 0; i < terms.length; i++) {
		if (terms[i].name === fileURI) {
			return terms[i];
		}
	}
	return null;
}

export function activate(context: ExtensionContext) {
	// console.log("Forge Client activated!");

	// inspired by: https://github.com/GrandChris/TerminalRelativePath/blob/main/src/extension.ts
	// todo: this seems to be overriding existing link provider?
	vscode.window.registerTerminalLinkProvider({
		provideTerminalLinks: (context, token) => {
			const forgeFileReg = /[\\/]*?([^\\/\n\s]*\.frg):(\d+):(\d+):?/;  // assumes no space in filename
			const matcher = (context.line as string).match(forgeFileReg);
			if (matcher === undefined) {
				return [];
			} else {
				// console.log(`matched forge file: ${matcher}`);

				const filename = matcher[1];
				// verify that filename matches?
				const filePath = vscode.window.activeTextEditor.document.uri.fsPath;
				const filePathFilename = filePath.split(/[/\\]/).pop();
				// console.log(`${filePath}: active filename: ${filePathFilename}; filename: ${filename}`);
				if (filePathFilename !== filename) {
					// console.log("the line name is not the active filename");
					return [];
				}
				
				const line = parseInt(matcher[2]) - 1;
				const col = parseInt(matcher[3]) - 1;

				const tooltip = filePath + `:${line}:${col}`;

				return [
					{
						startIndex: matcher.index,
						length: matcher[0].length,
						tooltip: tooltip,
						filePath: filePath,
						line: line,
						column: col
					}
				];
			}
		},
		handleTerminalLink: (link: any) => {

			if (link.line !== undefined) {
				// console.log(`link.line detected: ${link.filePath}`);
				const start = new vscode.Position(link.line, link.column);
				const end = new vscode.Position(link.line, link.column);
				const range = new vscode.Range(start, end);

				const opts: vscode.TextDocumentShowOptions = {
					selection: range
				};

				vscode.commands.executeCommand("vscode.open", vscode.Uri.file(link.filePath), opts);
			}
			else {
				vscode.commands.executeCommand('vscode.open', vscode.Uri.file(link.filePath));
			}
		}
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const runFile = vscode.commands.registerCommand('forge.runFile', () => {
		// The code you place here will be executed every time your command is executed
		// console.log("runFile Command starts ...");
		const filepath = vscode.window.activeTextEditor.document.uri.fsPath;
		let terminal: vscode.Terminal | null = getTerminal(filepath);
		if (!terminal) {
			terminal = vscode.window.createTerminal(`${filepath}`);
		}

		// hack for forge error display

		terminal.sendText(`clear`);
		terminal.show();
		terminal.sendText(`racket "${filepath}"`);

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(runFile);

	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'forge' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'forgeLanguageServer',
		'Forge Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
	console.log("Client and Server launched");
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
