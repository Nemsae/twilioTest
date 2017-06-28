const express = require('express');
const router = express.Router();

router.use('/enigma', require('./enigma'));
router.use('/twilio', require('./twilio'));

module.exports = router;
