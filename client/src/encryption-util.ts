import * as crypto from 'crypto';
import * as fs from 'fs';

export class SymmetricEncryptor {
	
	private key : string = "b3d93477f35b5b55f23218de7b5f48b3db89755f42d0326ddfa224af2caa3fc6"; 
	
	encrypt(plainText) {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
		let encryptedText = cipher.update(plainText, 'utf8', 'hex');
		encryptedText += cipher.final('hex');
		return iv.toString('hex') + encryptedText;
	}

	decrypt(encryptedText) {
		const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
		const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
		let decryptedText = decipher.update(encryptedText.slice(32), 'hex', 'utf8');
		decryptedText += decipher.final('utf8');
		return decryptedText;
	}


	
}
