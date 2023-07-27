const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isOnline: {
    type: Boolean,
    default: false,
    // required: true,
  },
  notification: {
    enabled: {
      type: Boolean,
      default: false,
    },
    notifyID: {
      type: String,
      default: '',
    },
  },
  friends: [{
    userName: {
      type: String,
    },
    room: {
      type: String,
    },
    unReadMessages: {
      fromDate: {
        type: String,
        default: '',
      },
      isPendingRead: {
        type: Boolean,
        default: true,
      },
    },
    _id: false,
  }],
});

module.exports = mongoose.model('ChatverseAuth', User);
