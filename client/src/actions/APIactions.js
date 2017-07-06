import API from '../API';

const APIActions = {
  encryptMessage(encryptionPackage) {
    API.sendEncryption(encryptionPackage);
  },
  decryptMessage(decryptionPackage) {
    API.sendDecryption(decryptionPackage);
  },
  sendMessage(messagePackage) {
    API.sendMessage(messagePackage);
  },
};

export default APIActions;
