import { spawn, execSync, ChildProcess } from 'child_process';
import * as vscode from 'vscode';
import * as path from 'path';
import * as tcpPortUsed from 'tcp-port-used';

export class CnDProcess {
	private static instance: CnDProcess | null = null;
	private childProcess: ChildProcess | null = null;
	private outputChannel: vscode.OutputChannel;

	private constructor() {
		const cndport = 3000;

		this.outputChannel = vscode.window.createOutputChannel('Cope and Drag');

		this.checkPortAvailability(cndport).then((isAvailable) => {

			if (!this.checkNodeInstallation()) {
				vscode.window.showErrorMessage('Could not launch Cope and Drag: Node.js is not installed. Please install Node.js and try again.');
			} else if (!isAvailable) {
				vscode.window.showErrorMessage('Could not launch Cope and Drag: Port 3000 is already in use.');

			} else {
				this.launchServer();
			}
		});
	}

	public static killInstanceIfExists() {
		if(CnDProcess.instance) {
			CnDProcess.instance.kill();
			CnDProcess.instance = null;
		}
	}

	public static getInstance(): CnDProcess {
		if (!CnDProcess.instance) {
			CnDProcess.instance = new CnDProcess();
		}
		return CnDProcess.instance;
	}

	private checkNodeInstallation(): boolean {
		try {
			let x = execSync('node -v');
			// Can I print the x value to the output channel?
			this.outputChannel.appendLine(`Node version: ${x}`);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	private async checkPortAvailability(port: number): Promise<boolean> {
		try {
			const inUse = await tcpPortUsed.check(port);
			return !inUse;
		} catch (error) {
			vscode.window.showErrorMessage(`Error checking port ${port}: ${error.message}`);
			throw error;
		}
	}

	private launchServer(): void {
		const serverPath = path.resolve(__dirname, '../../cnd/index.js');
		this.childProcess = spawn('node', [serverPath], { shell: true });

		this.childProcess.stdout?.on('data', (data) => {
			this.outputChannel.appendLine(`CnD stdout: ${data}`);
		});

		this.childProcess.stderr?.on('data', (data) => {
			this.outputChannel.appendLine(`CnD stderr: ${data}`);
		});

		this.childProcess.on('close', (code) => {
			this.outputChannel.appendLine(`CnD process exited with code ${code}`);
		});

		// Ensure the process is killed on exit
		process.on('exit', () => this.kill());
		process.on('SIGINT', () => this.kill());
		process.on('SIGTERM', () => this.kill());
	}

	public kill(): void {
		if (this.childProcess) {
			console.log('Killing CnD process');
			this.childProcess.kill();
			this.childProcess = null;
		}
	}
}