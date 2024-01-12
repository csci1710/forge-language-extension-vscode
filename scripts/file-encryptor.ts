
import {SymmetricEncryptor} from '../client/src/encryption-util';
import * as fs from 'fs';

function encryptFile(inputFilePath, outputFilePath) {
	// Read the input file
	const plainText = fs.readFileSync(inputFilePath, 'utf8');

	// Encrypt the plain text
	const encryptedText = e.encrypt(plainText);

	// Write the encrypted text to the output file
	fs.writeFileSync(outputFilePath, encryptedText, 'utf8');
}

var e = new SymmetricEncryptor();
// Access command line arguments
const args = process.argv.slice(2);


if (args.length !== 2 || typeof args[0] !== 'string' || typeof args[1] !== 'string') {
    console.error('Usage : <input file path> <encrypted file destination>');
    process.exit(1);
}

const inputFilePath = args[0];
const outputFilePath = args[1];

if (fs.existsSync(inputFilePath)) {
	encryptFile(inputFilePath, outputFilePath);
} else {
	console.error('Input file does not exist.');
	process.exit(1);
}


encryptFile(inputFilePath, outputFilePath);
