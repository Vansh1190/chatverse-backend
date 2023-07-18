const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Schema/User');
const signIn = require('./signIn');

require('dotenv').config();

const router = express.Router();

router.get('/signin', signIn, (req, res) => {
  res.send({ token: req.token });
});

router.post('/signup', (req, res) => {
  const token = jwt.sign(req.body, process.env.Secret);
  req.body.token = token;
  const user = new User(req.body);
  user.save().then(() => {
    res.send('hello world');
  }).catch((err) => {
    res.status(400).send(`Our Server is getting to many request please try again.\nTip:Try Changing UserName(try Something unique) \n\nMore details about ERRor: ${err}`);
  });
});

module.exports = router;
