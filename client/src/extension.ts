import * as path from 'path';
import * as vscode from 'vscode';
import { workspace, ExtensionContext, Diagnostic, DiagnosticSeverity, DiagnosticCollection, languages } from 'vscode';



import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

import { Logger, LogLevel } from "./logger";
import {RacketProcess} from './racketprocess';

var os = require("os");
var hostname = os.hostname();

let client: LanguageClient;

const forgeOutput = vscode.window.createOutputChannel('Forge Output');
const forgeEvalDiagnostics = vscode.languages.createDiagnosticCollection('Forge Eval');
let racket: RacketProcess = new RacketProcess(forgeEvalDiagnostics, forgeOutput);


function subscribeToDocumentChanges(context: vscode.ExtensionContext, myDiagnostics: vscode.DiagnosticCollection): void {

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => myDiagnostics.delete(e.document.uri))
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => myDiagnostics.delete(doc.uri))
	);
}

// TODO: Want to make this an extension method on TextDocument, but cannot wrangle it.
function textDocumentToLog(d, focusedDoc) {

	const content = d.getText();
	const filePath = d.isUntitled ? "untitled" : d.fileName;
	const fileName = path.parse(filePath).base;

	return {
		focused : focusedDoc,
		filename: fileName,
		filepath: filePath,
		fileContent: content,
	};
}

export function activate(context: ExtensionContext) {
	// inspired by: https://github.com/GrandChris/TerminalRelativePath/blob/main/src/extension.ts
	vscode.window.registerTerminalLinkProvider({
		provideTerminalLinks: (context, token) => {
			const matcher = racket.matchForgeError(context.line);
			if (!matcher) {
				return [];
			} else {
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
			// todo: need to double check if line could be undefined or null
			if (link.line !== undefined) {
				racket.showFileWithOpts(link.filePath, link.line, link.column);
			}
			else {
				racket.showFileWithOpts(link.filePath, null, null);
			}
		}
	});


	context.globalState.update('forge.isLoggingEnabled', true);
	vscode.commands.executeCommand('setContext', 'forge.isLoggingEnabled', true);

	// Designed to be run in GitPod
	let userid = process.env.GITPOD_WORKSPACE_ID ?? ("autogen-id-" + hostname)
	var logger = new Logger(userid);


	const runFile = vscode.commands.registerCommand('forge.runFile', () => {

		let isLoggingEnabled = context.globalState.get<boolean>('forge.isLoggingEnabled', false);
		const editor = vscode.window.activeTextEditor;
		const fileURI = editor.document.uri;
		const filepath = fileURI.fsPath;


		forgeOutput.clear();
		forgeOutput.show();

		// try to only run active forge file
		if (filepath.split(/\./).pop() !== 'frg') {
			vscode.window.showInformationMessage('Click on the Forge file first before hitting the run button :)');
			console.log(`cannot run file ${filepath}`);
			return;
		}

		forgeOutput.appendLine(`Running file "${filepath}" ...`);
		let racketProcess = racket.runFile(filepath);

		if (!racketProcess) {
			console.error('Cannot spawn Forge process');
		}

		racketProcess.stdout.on('data', (data: string) => {
			const lst = data.toString().split(/[\n]/);
			for (let i = 0; i < lst.length; i++) {
				// this is a bit ugly but trying to avoid confusing students
				if (lst[i] === 'Sterling running. Hit enter to stop service.') {
					forgeOutput.appendLine('Sterling running. Hit Stop to stop service.');
				} else {
					forgeOutput.appendLine(lst[i]);
				}
			}
		});

		let myStderr = '';
		racketProcess.stderr.on('data', (err: string) => {
			myStderr += err;
		});













		if (isLoggingEnabled && editor) {
							 
			const documentData = vscode.workspace.textDocuments.map((d) => {
				const focusedDoc = (d === editor.document);
				return textDocumentToLog(d, focusedDoc);
			});
			logger.log_payload(documentData, LogLevel.INFO);
		}
	});

	const stopRun = vscode.commands.registerCommand('forge.stopRun', () => {
		racket.kill(true);
	});


	const enableLogging = vscode.commands.registerCommand('forge.enableLogging', () => {
		context.globalState.update('forge.isLoggingEnabled', true);
		vscode.commands.executeCommand('setContext', 'forge.isLoggingEnabled', true);
	});

	const disableLogging = vscode.commands.registerCommand('forge.disableLogging', () => {
		context.globalState.update('forge.isLoggingEnabled', false);
		vscode.commands.executeCommand('setContext', 'forge.isLoggingEnabled', false);
	});


	const halp = vscode.commands.registerCommand('forge.halp', () => {
		
		
		// Need to do a bunch of things here.
	
	
	
	
	
	
	
	
	
	
	
	
	});




	context.subscriptions.push(runFile, stopRun, enableLogging, disableLogging, halp, forgeEvalDiagnostics);

	subscribeToDocumentChanges(context, forgeEvalDiagnostics);

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
	console.log('Client and Server launched');
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	// kill racket process
	racket.kill(false);
	return client.stop();
}
