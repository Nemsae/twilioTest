require('dotenv').config({ silent: true });
const mongoose = require('mongoose');
const Twilio = require('twilio');
const twilioConfig = require('../config/twilioConfig');

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const SubscriberSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  subscribed: {
    type: Boolean,
    default: false,
  },
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

SubscriberSchema.statics.sendMessage = (message, url, callback) => {
  Subscriber.find({
    subscribed: true,
  }, (err, docs) => {
    if (err || docs.length == 0) {
      return callback.call(this, {
        message: 'Couldn\'t find any subscribers!',
      });
    }

    //   if there are no erros, or we have documents
    sendMessages(docs);
  });

  function sendMessages(docs) {
    docs.forEach((subscriber) => {
      //  options to send the message
      let options = {
        to: subscriber.phone,
        from: twilioConfig.twilioNumber,
        body: message,
      };

      //  include media url
      if (url) options.mediaUrl = url;

      // Send message
      client.sendMessage(options, (err, response) => {
        if (err) {
          console.log('ERROR sendMessage: ', err);  // eslint-disable-line no-console
        } else {
          //  Log the last few digits of a phone number
          let masked = subscriber.phone.substr(0, subscriber.phone.length - 5);
          masked += '*****';
          console.log(`Message sent to ${masked}.`);  // eslint-disable-line no-console
        }
      });
    });

    //  Don't wait on success/failure, just indicate that all message have queued for delivery
    callback.call(this);
  }
};


module.exports = Subscriber;
