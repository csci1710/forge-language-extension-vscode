import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';
import { ChildProcess, spawn } from 'child_process';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true
			}
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.forgeLanguageServer || defaultSettings)
		);
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'forgeLanguageServer'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	validateTextDocument(change.document);
});

// make the racket child process global
let racket: ChildProcess | null = null;

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// const settings = await getDocumentSettings(textDocument.uri);

	const text = textDocument.getText();
	// todo: this is a temporary solution to let it work, should ask about racket stdin
	const filepath = "/tmp/forge-language-server.rkt"; // textDocument.uri.slice("file://".length);
	const diagnostics: Diagnostic[] = [];
	// todo: make sure the filepath is valid
	// connection.console.log(filepath);

	// write to tmp
	const echo = spawn(`echo '${text}' > ${filepath}`, { shell: true });
	echo.on('exit', (code: string) => {

		let myStderr = "\n";
		// send text to repl and get result
		if (racket) {
			racket.kill('SIGTERM');
		}
		racket = spawn(`echo '(enter! (file "${filepath}"))' | racket`, { shell: true });
		if (!racket) {
			throw new Error("cannot launch racket"); // console.error("cannot launch racket");
			// return diagnostics;
		}

		if (racket.stderr) {
			racket.stderr.on('data', (data: string) => {
				myStderr += data;
				// connection.console.log(`Racket Err: ${data}`);
			});
		}

		racket.on('exit', (code: string) => {
			if (myStderr !== "\n") {
				let start = 0;
				let end = 0;

				const line_match = /line=(\d+)/.exec(myStderr); 
				const column_match = /column=(\d+)/.exec(myStderr); 
				// let offset_match = parser(myStderr, /offset=(\d+)/);
				
				let line_num = 0;
				let col_num = 0;

				if (line_match !== null && column_match !== null) {
					// connection.console.log(`line match: ${line_match[0]}, col match: ${column_match[0]}`);
					line_num = parseInt(line_match[0].slice("line=".length));
					col_num = parseInt(column_match[0].slice("column=".length));

				} else {
					const special_match = /rkt:(\d+):(\d+):/.exec(myStderr); 
					if (special_match !== null) {
						line_num = parseInt(special_match[1]);
						col_num = parseInt(special_match[2]);
					}
				}

				if (line_num !== 0) {
					// connection.console.log(`line num: ${line_num}, col num: ${col_num}`);
					// // iterate through file content
					let m: RegExpExecArray | null;
					const pattern = /(.*)\n/g;
					while (line_num > 0 && (m = pattern.exec(text))) {
						// connection.console.log(`match: ${m[0]}, ${m.index}`);
						start = m.index + col_num;
						end = m.index + m[0].length;
						line_num -= 1;
					}
					// connection.console.log(`start: ${start}, end: ${end}`);
				}

				const diagnostic: Diagnostic = {
					severity: DiagnosticSeverity.Warning,
					range: {
						start: textDocument.positionAt(start),
						end: textDocument.positionAt(end)
					},
					message: `Racket evaluation error: ${myStderr}`,
					source: 'Racket REPL'
				};
				if (hasDiagnosticRelatedInformationCapability) {
					diagnostic.relatedInformation = [
						{
							location: {
								uri: textDocument.uri,
								range: Object.assign({}, diagnostic.range)
							},
							message: `${myStderr}`
						}
					];
				}
				diagnostics.push(diagnostic);
			}

			// Send the computed diagnostics to VSCode.
			connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });


		});
		// connection.console.log("end");
	});
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	(_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.
		return [
			{
				label: 'TypeScript',
				kind: CompletionItemKind.Text,
				data: 1
			},
			{
				label: 'JavaScript',
				kind: CompletionItemKind.Text,
				data: 2
			}
		];
	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		if (item.data === 1) {
			item.detail = 'TypeScript details';
			item.documentation = 'TypeScript documentation';
		} else if (item.data === 2) {
			item.detail = 'JavaScript details';
			item.documentation = 'JavaScript documentation';
		}
		return item;
	}
);

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
