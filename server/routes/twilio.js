require('dotenv').config({ silent: true });

const Twilio = require('twilio');
const express = require('express');

const router = express.Router();

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

router.route('/')
.post((req, res) => {
  const messageReq = req.body;
  console.log('messageReq: ', messageReq);
  client.messages.create({
    body: messageReq.body,
    to: messageReq.receiver,  // Text this number
    from: messageReq.sender, // From a valid Twilio number
    // body: 'Hardcoded',
    // to: '+16506782956',  // Text this number
    // from: '+16504259920', // From a valid Twilio number
  })
  .then((message) => {
    console.log('message: ', message);
    // console.log(message.sid);
    res.send(message.sid);
  })
  .catch((err) => {
    console.log('ERROR:post./ ', err);
    res.status(400).send(err);
  });
});


module.exports = router;
