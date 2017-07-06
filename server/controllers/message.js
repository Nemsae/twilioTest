require('dotenv').config({ silent: true });
const Twilio = require('twilio');
const Subscriber = require('../models/Subscriber');
const messageSender = require('../lib/messageSender');

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

//  Creating a function to handle Twilio SMS/MMS webhook requests
exports.webhook = (request, response) => {
  //  Grabbing user's phone number
  const phone = request.body.From;
  console.log('request.body:webhook ', request.body);
  Subscriber.findOne({
    phone,
  }, (err, sub) => {
    if (err) return response('Rixi Hiccup! Please text back again later.');

    if (!sub) {
      //  If no sub, create one
      const newSubscriber = new Subscriber({
        phone,
      });

      newSubscriber.save((err, newSub) => {
        if (err || !newSub) {
          return respond('We couldn\'t sign you up - try again.');
        }
        respond('Thanks for contacting Rixi! Text "subscribe" to receive' +
          'exclusive offers and coupons from us.');
      });
    } else {
      //  Existing user, process any messages they are sending,
      //  and send back appropiate message
      processMessage(sub);
    }
  });

  function processMessage(subscriber) {
    //  get text message
    let msg = request.body.Body || '';
    msg = msg.toLowerCase().trim();

    if (msg === 'subscribe' || msg === 'unsubscribe') {
      subscriber.subscribed = (msg === 'subscribe');
      subscriber.save((err) => {
        if (err) {
          return respond('We could not subscribe you - please try again')
        }

        let responseMessage = 'You are now subscribed for exclusive offers.';
        if (!subscriber.subscribed) {
          responseMessage = 'You have unsubscribed. Text "subscribe"'
          + ' to start receiving offers again.';
        }

        respond(responseMessage);
      });
    } else {
      //  Unknown command, text back available commands
      const responseMessage = 'Sorry, we didn\'t understand that. '
        + 'Available commands are: subscribe or unsubscribe.';

      respond(responseMessage);
    }
  }

  function respond(message) {
    response.type('text/xml');
    response.send(
      `<Response>
          <Message>${message}</Message>
      </Response>`
    );
  }
};

//  Sending a message to subscriber(S) from client
exports.sendMessages = (request, response) => {
  const message = `${request.body.sender} says "${request.body.message}"`;
  const imageUrl = request.body.imageUrl;

  //  Send messages to all subs
  Subscriber.find({
    subscribed: true,
  }).then((subscribers) => {
    messageSender.sendMessageToSubscribers(subscribers, message, imageUrl);
  }).then(() => {
    response.status(200).send('sendMessage success!');
  }).catch((err) => {
    console.log(`err ${err.meessage}`);  // eslint-disable-line no-console
    response.status(400).send(err.message);
  });
};

//  Sending a simple message
exports.sendSimpleMessage = (request, response) => {
  const messageReq = request.body;
  console.log('messageReq: ', messageReq);  // eslint-disable-line no-console

  client.messages.create({
    body: messageReq.body,
    to: messageReq.receiver,  // Text this number ex. "+16506782956"
    from: messageReq.sender, // From a valid Twilio number ex. "+16504259920"
  })
  .then((message) => {
    response.send(message.sid);
  })
  .catch((err) => {
    console.log('ERROR:POST:/api/twilio ', err);  // eslint-disable-line no-console
    response.status(400).send(err);
  });
};
