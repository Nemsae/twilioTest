const cryptico = require('cryptico');

const encryptionTest = {
  getCipheredText(message, key) {
    const RSAkey = cryptico.generateRSAKey(key, 1024);
    const publicKeyString = cryptico.publicKeyString(RSAkey);
    const EncryptionResult = cryptico.encrypt(message, publicKeyString);
    const CipherText = EncryptionResult.cipher;
    return CipherText;
  },
};

module.exports = encryptionTest;
