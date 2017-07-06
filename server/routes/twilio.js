const express = require('express');
const message = require('../controllers/message');

const router = express.Router();

router.route('/')
//  Sending a message to specified receiver from our Twilio account
.post(message.sendSimpleMessage);

router.route('/message/send')
//  Handle form submission and send messages to subscribers
.post(message.sendMessages);

//  LIVE WEBHOOK
router.route('/message')
//  When a user texts our number
.post(message.webhook);

//  DEAD WEBHOOK
router.route('/inbound')
//  When someone texts our Twilio account, we respond with a message
.get((req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send('<Response><Message>Rixi says hi!</Message></Response>');
});

module.exports = router;

//  EXAMPLE for sending a TWIML response
// app.post('/sms', function(req, res) {
//   var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();
//   twiml.message('The Robots are coming! Head for the hills!');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });
