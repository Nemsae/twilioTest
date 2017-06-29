const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  subscribed: {
    type: Boolean,
    default: false,
  },
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

module.exports = Subscriber;
