const express = require('express');
const jwt = require('jsonwebtoken');

const UserSchema = require('../Schema/User');

const router = express.Router();

router.post('/signup', (req, res) => {
  req.body.verified = false;
  const token = jwt.sign(req.body, process.env.Secret);
  req.body.token = token;
  const hi = new UserSchema(req.body);
  hi.save().then(() => {
    res.send({
      Authtoken: token,
      status: 200,
      message: 'user Successfully Registered',
    });
  }).catch((err) => {
    res.status(400).send({ error: `Internal Server Error try again, ${err}` });
  });
});

router.post('/signin', (req, res) => {
  UserSchema.find({ userName: req.body.userName }).then((e) => {
    if (e.length === 0) {
      return res.status(400).send('Match not found');
    }
    if (req.body.password === e[0].password) {
      return res.status(200).send({
        status: 'Match found',
        token: e[0].token,
      });
    }
    return res.status(400).send('Match not found');
  }).catch(() => {
  });
  // res.send(req.headers);
});

module.exports = router;
