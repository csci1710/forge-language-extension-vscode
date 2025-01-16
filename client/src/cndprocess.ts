import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

export class CnDProcess {
    private static instance: CnDProcess | null = null;
    private childProcess: ChildProcess | null = null;

    private constructor() {
        this.launchServer();
    }

    public static getInstance(): CnDProcess {
        if (!CnDProcess.instance) {
            CnDProcess.instance = new CnDProcess();
        }
        return CnDProcess.instance;
    }

    private launchServer(): void {
        const serverPath = path.resolve(__dirname, '../../cnd/index.js');
        this.childProcess = spawn('node', [serverPath], { shell: true });

        this.childProcess.stdout?.on('data', (data) => {
            console.log(`CnD stdout: ${data}`);
        });

        this.childProcess.stderr?.on('data', (data) => {
            console.error(`CnD stderr: ${data}`);
        });

        this.childProcess.on('close', (code) => {
            console.log(`CnD process exited with code ${code}`);
        });

        // Ensure the process is killed on exit
        process.on('exit', () => this.kill());
        process.on('SIGINT', () => this.kill());
        process.on('SIGTERM', () => this.kill());
    }

    public kill(): void {
        if (this.childProcess) {
            this.childProcess.kill();
            this.childProcess = null;
        }
    }
}