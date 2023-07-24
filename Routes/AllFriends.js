const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Schema/User');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res) => {
  jwt.verify(req.body.data.authToken, process.env.Secret, (err, response) => {
    console.log(response);
    User.find({ userName: response.userName }).then((e) => {
      res.send(e[0].friends);
    });
  });
});

module.exports = router;
