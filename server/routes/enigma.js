const express = require('express');

const router = express.Router();

const Message = require('../models/Message');
const encryptionTest = require('../utils/encryption');
const decryptionTest = require('../utils/decryption');

router.route('/')
  .get((req, res) => {
    const decryptionPackage = req.query;
    const packageMessage = decryptionPackage.encryptedMessage;
    const packageDate = decryptionPackage.currentDate;
    const packageKey = decryptionPackage.key;

    Message.find({ key: packageKey })
    .then((messageDocuments) => {
      const messageDocument = messageDocuments[0];
      
      /* Validation Tests */
      const isMessageValid = decryptionTest.checkMessage(messageDocument.message, packageMessage);
      const isDateValid = decryptionTest.checkDate(messageDocument.expirationDate, packageDate);

      if (!isDateValid && !isMessageValid) res.send({ type: 'dateMessage' });
      if (!isDateValid) res.send({ type: 'date' });
      if (!isMessageValid) res.send({ type: 'message' });
      if (isMessageValid && isDateValid) {
        const decipheredText = decryptionTest.getDecipheredText(messageDocument, packageKey);
        messageDocument.message = decipheredText;
        res.send({ type: 'SUCCESS', payload: messageDocument });
      }
    })
    .catch(() => {
      res.send({ type: 'key' });
    });
  })
  .post((req, res) => {
    const encryptionPackage = req.body;
    const message = encryptionPackage.message;
    const key = encryptionPackage.key;

    /* ENCRYPT MESSGE */
    const CipherText = encryptionTest.getCipheredText(message, key);
    encryptionPackage.message = CipherText;

    Message.create(encryptionPackage)
    .then((encryption) => {
      res.send(encryption.message);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  });


module.exports = router;
