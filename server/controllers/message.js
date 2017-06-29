const Subscriber = require('../models/Subscriber');
const messageSender = require('../lib/messageSender');

//  Creating a function to handle Twilio SMS/MMS webhook requests

exports.webhook = (request, response) => {
  //  Grabbing user's phone number
  const phone = request.body.From;

  Subscriber.findOne({
    phone,
  }, (err, sub) => {
    if (err) return response('Rixi Hiccup! Please text back again later.');

    if (!sub) {
      //  If no sub, create one
      const newSubscriber = new Subscriber({
        phone: phone,
      });

      newSubscriber.save((err, newSub) => {
        if (err || !newSub) {
          return respond('We couldn\'t sign you up - try again.');
        }
        respond('Thanks for contacting us! Text "subscribe" to receive' +
          'exclusive offers and coupons.');
      });
    } else {
      //  Existing user, process any input messages they are sending,
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
};
