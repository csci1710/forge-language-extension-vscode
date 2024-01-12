"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encryption_util_1 = require("../client/src/encryption-util");
var fs = require("fs");
function encryptFile(inputFilePath, outputFilePath) {
    // Read the input file
    var plainText = fs.readFileSync(inputFilePath, 'utf8');
    // Encrypt the plain text
    var encryptedText = e.encrypt(plainText);
    // Write the encrypted text to the output file
    fs.writeFileSync(outputFilePath, encryptedText, 'utf8');
}
var e = new encryption_util_1.SymmetricEncryptor();
// Access command line arguments
var args = process.argv.slice(2);
if (args.length !== 2 || typeof args[0] !== 'string' || typeof args[1] !== 'string') {
    console.error('Usage : <input file path> <encrypted file destination>');
    process.exit(1);
}
var inputFilePath = args[0];
var outputFilePath = args[1];
if (fs.existsSync(inputFilePath)) {
    encryptFile(inputFilePath, outputFilePath);
}
else {
    console.error('Input file does not exist.');
    process.exit(1);
}
encryptFile(inputFilePath, outputFilePath);
