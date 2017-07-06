require('dotenv').config({ silent: true });
const Twilio = require('twilio');
const config = require('../config/twilioConfig');

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSingleTwilioMessage = (subscriber, message, url) => {
  // Create options to send the message
  console.log('subscriber: ', subscriber, 'message: ', message,  'url: ', url  );
  const options = {
    to: subscriber.phone,
    from: config.twilioNumber,
    body: message,
  };

  // Include media URL if one was given for MMS
  if (url) options.mediaUrl = url;

  return new Promise((resolve, reject) => {
    // Send the message!
    client.messages.create(options)
    .then((message) => {
      console.log('sendSingleTwilioMessage:MESSAGE ', message); // eslint-disable-line no-console
      resolve(message);
    })
    .catch((error) => {
      console.log('sendSingleTwilioMessage:ERROR ', error); // eslint-disable-line no-console
      reject(error);
    });
  });
};

// Function to send a message to all current subscribers
const sendMessageToSubscribers = (subscribers, message, url) => {
  // Find all subscribed users
  console.log('subscribers: ', subscribers, 'message: ', message);  // eslint-disable-line no-console
  return new Promise((resolve, reject) => {
    if (subscribers.length === 0) {
      //  ISSUE WITH PROMISE HERE
      console.log('Sanity:0');
      reject({ message: 'Could not find any subscribers!' });
    } else {
      console.log('Sanity:1');
      // Send messages to all subscribers via Twilio
      subscribers.map((subscriber) => {
        console.log('Sanity:2');
        return sendSingleTwilioMessage(subscriber, message, url);
      }).reduce((all, currentPromise) => {
        console.log('all: ', all, 'currentPromise: ', currentPromise);   // eslint-disable-line no-console
        return Promise.all([ all, currentPromise ]);
      }, Promise.resolve()).then(() => {
        resolve();
      });
    }
  });
};

module.exports.sendMessageToSubscribers = sendMessageToSubscribers;
