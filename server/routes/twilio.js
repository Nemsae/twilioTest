const accountSid = 'AC3873ec885fb8d993355e77956fb0c930'; // Your Account SID from www.twilio.com/console
const authToken = '9244de510c4ddad9e4d9e46240768791';   // Your Auth Token from www.twilio.com/console

const Twilio = require('twilio');
const express = require('express');

const router = express.Router();

const client = new Twilio(accountSid, authToken);

router.route('/')
.post((req, res) => {
  const messageReq = req.body;
  console.log('messageReq: ', messageReq);
  client.messages.create({
    // body: messageReq.body,
    // to: messageReq.receiver,  // Text this number
    // from: messageReq.sender, // From a valid Twilio number
    body: 'Hardcoded',
    to: '+16506782956',  // Text this number
    from: '+16504259920', // From a valid Twilio number
  })
  .then((message) => {
    console.log('message: ', message);
    console.log(message.sid);
    res.send(message.sid);
  })
  .catch((err) => {
    console.log('ERROR:post./ ', err);
    res.status(400).send(err);
  });
});


module.exports = router;
