require('dotenv').config({ silent: true });
const Twilio = require('twilio');
const express = require('express');

const router = express.Router();
const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

router.route('/')
.post((req, res) => {
  const messageReq = req.body;
  console.log('messageReq: ', messageReq);  // eslint-disable-line no-console
  client.messages.create({
    body: messageReq.body,
    to: messageReq.receiver,  // Text this number
    from: messageReq.sender, // From a valid Twilio number
  })
  .then((message) => {
    // console.log('message: ', message);
    // console.log(message.sid);
    // res.send(JSON.stringify(message));
    res.send(message.sid);
  })
  .catch((err) => {
    console.log('ERROR:POST:/api/twilio ', err);  // eslint-disable-line no-console
    res.status(400).send(err);
  });
});

router.route('/inbound')
.get((req, res) => {
  // console.log('res: ', res);
  res.set('Content-Type', 'text/xml');
  res.send('<Response><Message>Rixi says hi!</Message></Response>');
  //   content_type 'text/xml'
  //   '<Response><Message>Touchdown, Bo Jackson!</Message></Response>'
  // end
});

module.exports = router;
