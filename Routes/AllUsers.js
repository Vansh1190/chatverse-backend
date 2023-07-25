const express = require('express');
const User = require('../Schema/User');
const verifyRequest = require('./Middleware/verifyReq');
require('dotenv').config();

const router = express.Router();

router.post('/', verifyRequest, (req, res) => {
  const AllUsers = [];
  User.find({}).then((items) => {
    items.forEach((e) => {
      AllUsers.push(e.userName);
    });
    res.send({ allUsers: AllUsers });
  });
});

module.exports = router;
