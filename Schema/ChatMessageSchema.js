const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChatMessages = new Schema({
  messages: [{
    message: {
      type: String,
    },
    time: {
      type: String,
      default: new Date().toLocaleString(),
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    read: {
      type: String,
      default: false,
    },
  }],
  roomID: {
    type: String,
    // required: true,
  },
});
module.exports = mongoose.model('ChatVerseMessages', ChatMessages);
