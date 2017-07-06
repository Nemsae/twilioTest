require('dotenv').config({ silent: true });
const Twilio = require('twilio');
const express = require('express');
const message = require('../controllers/message');

const router = express.Router();
const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

router.route('/')
//  Sending a message to specified receiver from our Twilio account
.post((req, res) => {
  const messageReq = req.body;
  console.log('messageReq: ', messageReq);  // eslint-disable-line no-console
  client.messages.create({
    body: messageReq.body,
    to: messageReq.receiver,  // Text this number ex. "+16506782956"
    from: messageReq.sender, // From a valid Twilio number ex. "+16504259920"
  })
  .then((message) => {
    res.send(message.sid);
  })
  .catch((err) => {
    console.log('ERROR:POST:/api/twilio ', err);  // eslint-disable-line no-console
    res.status(400).send(err);
  });
});

router.route('/inbound')
//  When someone texts our Twilio account, we respond with a message
.get((req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send('<Response><Message>Rixi says hi!</Message></Response>');
});

router.route('/message')
//  When a user texts our number
.post(message.webhook);
// .post('/message', message.webhook);

//  Render a page that will allow an admin to send out a message to subs
// app.get('/', pages.showForm);

router.route('/message')
//  Handle form submission and send messages to subscribers
// .post('/message/send', message.sendMessages);

module.exports = router;
