import API from '../API';

const APIActions = {
  encryptMessage(encryptionPackage) {
    API.sendEncryption(encryptionPackage);
  },
  decryptMessage(decryptionPackage) {
    API.sendDecryption(decryptionPackage);
  },
};

export default APIActions;
