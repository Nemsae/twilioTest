import API from '../API';

const APIActions = {
  encryptMessage(encryptionPackage) {
    API.sendEncryption(encryptionPackage);
  },
  decryptMessage(decryptionPackage) {
    API.sendDecryption(decryptionPackage);
  },
  sendMessage(messagePackage) {
    console.log('messagePackage:APIactions ', messagePackage);
  },
};

export default APIActions;
