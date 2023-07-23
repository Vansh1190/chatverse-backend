const express = require('express');
// const mongoose = require('mongoose');
const ChatMessage = require('../Schema/ChatMessageSchema');
const verifyRequest = require('./Middleware/verifyReq');

const router = express.Router();

router.post('/', verifyRequest, (req, res) => {
  ChatMessage.find({ roomID: req.body.roomID }).then((e) => {
    res.send(e);
  });
});
module.exports = router;
