const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  key: { type: String },
  expirationDate: { type: Date, required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
