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
  friends: [{
    userName: {
      type: String,
    },
    room: {
      type: String,
    },
    _id: false,
  }],
});

module.exports = mongoose.model('ChatverseAuth', User);
