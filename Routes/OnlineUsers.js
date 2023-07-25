const express = require('express');
const User = require('../Schema/User');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res) => {
  const AllOnlineUsers = [];
  User.find({ isOnline: true }).then((items) => {
    items.forEach((e) => {
      if (e.userName) {
        AllOnlineUsers.push(e.userName);
      }
    });
    res.send({ allUsers: AllOnlineUsers });
  });
  // jwt.verify(req.headers.authtoken, process.env.Secret, (err, response) => {
  //   User.find({ userName: response.userName }).then((e) => {
  //     res.send(e[0].friends);
  //   });
  // });
});

module.exports = router;
