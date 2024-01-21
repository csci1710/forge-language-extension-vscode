import { ChildProcess, spawn } from 'child_process';
import * as vscode from 'vscode';
import { Diagnostic, DiagnosticCollection, DiagnosticSeverity } from 'vscode';


export class RacketProcess {
		
	private childProcess: ChildProcess | null;
	public racketKilledManually : boolean;
	private userFacingOutput : vscode.OutputChannel;
	private evalDiagnostics : vscode.DiagnosticCollection;
	

	constructor(evalDiagnostics : vscode.DiagnosticCollection, userFacingOutput: vscode.OutputChannel) {
		this.evalDiagnostics = evalDiagnostics;
		this.userFacingOutput = userFacingOutput;
		this.childProcess = null;
		this.racketKilledManually = false;
	}



	runFile(filePath : string) : ChildProcess | null {
		// always auto-save before any run
		if (!vscode.window.activeTextEditor.document.save())
		{
			console.error(`Could not save ${filePath}`);
			return null;
		}

		this.kill(false);
		this.childProcess = spawn('racket', [`"${filePath}"`], { shell: true });


		this.childProcess.on('exit', (code: string) => {
			this.racketKilledManually = false;
		});
		return this.childProcess
	}


	destroy() {
		if (this.childProcess) {
			this.childProcess.kill();
			this.childProcess = null;
		}
	}

	
	kill(manual: boolean) {
		if (this.childProcess) {
			this.childProcess.kill();
			this.racketKilledManually = manual;
		}
		this.childProcess = null;
	}



	// This is broken		
	sendEvalErrors(text: string, fileURI: vscode.Uri, diagnosticCollectionForgeEval: DiagnosticCollection) {
		let matcher: RegExpMatchArray | null;
		const textLines = text.split(/[\n\r]/);
		for (let i = 0; i < textLines.length; i++) {
			matcher = this.matchForgeError(textLines[i]);
			if (matcher) {
				// for now stops at the first error
				// this could be risky if there are frg files in the source code
				break;
			}
		}

		if (matcher) {
			this.userFacingOutput.appendLine(text);

			const line = parseInt(matcher[2]) - 1;
			const col = parseInt(matcher[3]) - 1;

			const diagnostics: Diagnostic[] = [];

			const start = new vscode.Position(line, col);
			const end = new vscode.Position(line, col + 1); // todo: add length?
			const range = new vscode.Range(start, end);

			const diagnostic: Diagnostic = {
				severity: DiagnosticSeverity.Error,
				range: range,
				message: `Forge Evaluation Error: ${line}`,
				source: 'Racket'
			};
			diagnostics.push(diagnostic);
			diagnosticCollectionForgeEval.set(fileURI, diagnostics);
			this.showFileWithOpts(fileURI.fsPath, line, col);
		} else {
			this.showFileWithOpts(fileURI.fsPath, null, null);
		}
	}

	matchForgeError(line: string): RegExpMatchArray | null {
		const forgeFileReg = /[\\/]*?([^\\/\n\s]*\.frg):(\d+):(\d+):?/;  // assumes no space in filename
		return (line as string).match(forgeFileReg);
	}
	
	showFileWithOpts(filePath: string, line: number | null, column: number | null) {
		if (line === null || column === null) {
			vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath));
		} else {
			const start = new vscode.Position(line, column);
			const end = new vscode.Position(line, column);
			const range = new vscode.Range(start, end);
	
			const opts: vscode.TextDocumentShowOptions = {
				selection: range
			};
	
			vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filePath), opts);
		}
	}
}


