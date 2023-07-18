const express = require('express');

const jwt = require('jsonwebtoken');
const UserSchema = require('../Schema/User');

const router = express.Router();

router.post('/', (req, res) => {
  UserSchema.findOneAndUpdate({ email: req.body.email }, { verified: true }).then((e) => {
    e.verified = true;
    e.token = '';
    const newObj = {
      name: e.name,
      userName: e.userName,
      password: e.password,
      email: e.email,
      token: '',
      verified: true,
    };
    const Token = jwt.sign(newObj, process.env.Secret);
    req.body.token = Token;
    UserSchema.findOneAndUpdate({ email: req.body.email }, { token: Token })
      .then(() => {
        res.send({ status: 200, message: 'User successfully verified', authToken: Token });
      }).catch(() => {
        res.send({ status: 200, message: 'User not verified, Internal server error 404', authToken: Token });
      });
  }).catch(() => {
    res.send({ status: 400, message: 'User not verified, Internal server error 404' });
  });
});

module.exports = router;
