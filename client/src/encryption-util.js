"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymmetricEncryptor = void 0;
var crypto = require("crypto");
var SymmetricEncryptor = /** @class */ (function () {
    function SymmetricEncryptor() {
        this.key = "b3d93477f35b5b55f23218de7b5f48b3";
    }
    SymmetricEncryptor.prototype.encrypt = function (plainText) {
        var iv = crypto.randomBytes(16);
        var cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);
        var encryptedText = cipher.update(plainText, 'utf8', 'hex');
        encryptedText += cipher.final('hex');
        return iv.toString('hex') + encryptedText;
    };
    SymmetricEncryptor.prototype.decrypt = function (encryptedText) {
        var iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
        var decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
        var decryptedText = decipher.update(encryptedText.slice(32), 'hex', 'utf8');
        decryptedText += decipher.final('utf8');
        return decryptedText;
    };
    return SymmetricEncryptor;
}());
exports.SymmetricEncryptor = SymmetricEncryptor;
