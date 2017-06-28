const cryptico = require('cryptico');

const decryptionTest = {
  getDecipheredText(dbDocument, key) {
    const RSAkey = cryptico.generateRSAKey(key, 1024);
    const DecryptionResult = cryptico.decrypt(dbDocument.message, RSAkey);
    const DecipherText = DecryptionResult.plaintext;
    return DecipherText;
  },
  checkMessage(dbMessage, packageMessage) {
    return dbMessage === packageMessage;
  },
  checkDate(expirationDate, packageDate) {
    const expirationDateMS = expirationDate.getTime();
    const packageDateMS = Number(packageDate);
    return expirationDateMS > packageDateMS;
  },
};

module.exports = decryptionTest;
