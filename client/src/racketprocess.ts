import { ChildProcess, spawn } from 'child_process';
import * as vscode from 'vscode';
import { Diagnostic, DiagnosticCollection, DiagnosticSeverity } from 'vscode';


export class RacketProcess {
		
	private childProcess: ChildProcess | null;
	public racketKilledManually : boolean;
	public userFacingOutput : vscode.OutputChannel;
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
			vscode.window.showErrorMessage(`Forge run failed. Could not save ${filePath}`);
			return null;
		}

		this.kill(false);
		this.racketKilledManually = false;

		this.childProcess = spawn('racket', [`"${filePath}"`], { shell: true });
		return this.childProcess
	}


	continueEval() {
		if (this.childProcess) {
			return this.childProcess.stdin?.write('\n');
		}
		return false;
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


		function errLocationToDiagnostic(errLocation: any): Diagnostic {
			
			return {
				severity: DiagnosticSeverity.Error,
				range: errLocation['range'],
				message: `Forge Evaluation Error: ${errLocation['line']}`,
				source: 'Racket'
			}
		}

		this.userFacingOutput.appendLine(text);

		const textLines = text.split(/[\n\r]/);

		let errorList = textLines.map((line) => this.matchForgeError(line) ).filter((x) => x != null);
		let diagnostics: Diagnostic[] = errorList.map(errLocationToDiagnostic);

		diagnosticCollectionForgeEval.set(fileURI, diagnostics);
		

		let linenum = errorList.length > 0 ? errorList[0]['linenum'] : null;
		let colnum = errorList.length > 0 ?  errorList[0]['colnum'] : null;
		this.showFileWithOpts(fileURI.fsPath,linenum, colnum);
	}

	matchForgeError(line: string): Object | null {
		
		/* There are multiple types of errors that can be thrown by Forge.*/	
		const testFailurePattern = /[\\/]*?([^\\/\n\s]*\.frg):(\d+):(\d+) \(span (\d+)\)\]/;	
		const raiseSyntaxErrorPattern = /[\\/]*?([^\\/\n\s]*\.frg):(\d+):(\d+):?/;  // assumes no space in filename
		const raiseForgeErrorWithFileNamePattern = /#<path:(.*?)> \[line=(\d+), column=(\d+), offset=(\d+)\]/;
		const raiseForgeErrorPattern = /.*\[line=(\d+), column=(\d+), offset=(\d+)\]/;
		const generalLocPattern = /at loc: line (\d+), col (\d+), span: (\d+)/;
		const generalsrcLocPattern = /.*\(srcloc #<path:(.*?)> (\d+) (\d+) (\d+) (\d+)\)/;

	





		const raiseSyntaxErrorMatch = line.match(raiseSyntaxErrorPattern);
		const raiseForgeErrorWithFileNameMatch = line.match(raiseForgeErrorWithFileNamePattern);
		const raiseForgeErrorMatch = line.match(raiseForgeErrorPattern);
		const generalLocMatch = line.match(generalLocPattern);
		const generalsrcLocMatch = line.match(generalsrcLocPattern);

		const generalTestFailureMatch = line.match(testFailurePattern);



		let linenum, colnum, index;
		let span = -1;
		let filename = vscode.window.activeTextEditor?.document.fileName || ''; // Default to current file
		if (generalTestFailureMatch) {
			filename = generalTestFailureMatch[1];
			linenum = parseInt(generalTestFailureMatch[2]) - 1;
			colnum = parseInt(generalTestFailureMatch[3]) - 1;
			span = parseInt(generalTestFailureMatch[4]); 
			index = generalTestFailureMatch.index;
		}
		else if (raiseSyntaxErrorMatch) {
			filename = raiseSyntaxErrorMatch[1];
			linenum = parseInt(raiseSyntaxErrorMatch[2]) - 1;
			colnum = parseInt(raiseSyntaxErrorMatch[3]) - 1;
			index = raiseSyntaxErrorMatch.index;
		} 
		else if (raiseForgeErrorWithFileNameMatch) {
			filename = raiseForgeErrorWithFileNameMatch[1];
			linenum = parseInt(raiseForgeErrorWithFileNameMatch[2]) - 1;
			colnum = parseInt(raiseForgeErrorWithFileNameMatch[3]) - 1;
			index = raiseForgeErrorWithFileNameMatch.index;
		}
		else if (raiseForgeErrorMatch) {
			
			linenum = parseInt(raiseForgeErrorMatch[1]) - 1;
			colnum = parseInt(raiseForgeErrorMatch[2]) - 1;
			index = raiseForgeErrorMatch.index;

		} 
		else if (generalsrcLocMatch) {
			filename = generalsrcLocMatch[1];
			linenum = parseInt(generalsrcLocMatch[2]) - 1;
			colnum = parseInt(generalsrcLocMatch[3]) - 1;
			span = parseInt(generalsrcLocMatch[5]) - 1; 
			index = generalsrcLocMatch.index;
		}
		
		else if (generalLocMatch) {
			linenum = parseInt(generalLocMatch[1]) - 1;
			colnum = parseInt(generalLocMatch[2]) - 1;
			span = parseInt(generalLocMatch[3]) - 1; 
			index = generalLocMatch.index;
		}
		else{
			return null;
		}

		linenum = Math.max(0, linenum);
		colnum = Math.max(0, colnum);
		span = Math.max(1, span);

		const start = new vscode.Position(linenum, colnum);
		const end = new vscode.Position(linenum, colnum + span); 
		const range = new vscode.Range(start, end);

		return { linenum, colnum, start, end, range, line, index, filename};
	}
	


	// This does not support multiple lines
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


