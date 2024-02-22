import path from 'path';
import os from 'os';


export function tempFile(): string {
	const tempDir = os.tmpdir();
	const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const length = 10;
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return path.join(tempDir, result + '.rkt');
}
