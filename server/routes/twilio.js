const express = require('express');
const message = require('../controllers/message');

const router = express.Router();

router.route('/')
//  Sending a message to specified receiver from our Twilio account
.post(message.sendSimpleMessage);

router.route('/message/send')
//  Handle form submission and send messages to subscribers
.post(message.sendMessages);

router.route('/message')
//  When a user texts our number
.post(message.webhook);

router.route('/inbound')
//  When someone texts our Twilio account, we respond with a message
.get((req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send('<Response><Message>Rixi says hi!</Message></Response>');
});

module.exports = router;
