const express = require('express');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserSchema = require('../Schema/User');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ServerMail,
    pass: process.env.MailAuth,
  },
});

router.post('/genotp', (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpString = otp.toString().substring(0, 6);
  let foundMail = false;
  UserSchema.findOne({ email: req.body.email }).then((e) => {
    if (e == null) {
      return res.status(400).send({ status: 400, message: 'Please register first' });
    }
    foundMail = true;
    const mailOptions = {
      from: process.env.ServerMail,
      to: req.body.email,
      subject: `Your otp is ${otpString}`,
      text: `Your otp for PassWord Reset of ChatVerse is ${otpString}`,
    };
    // res.send(otpString);
    if (foundMail) {
      transporter.sendMail(mailOptions).then(() => {
        res.send({ authOtp: otpString });
      }).catch(() => {
        // console.log(err);
        res.status(400).send('Our application is experiencing high traffic at this moment, please try again later');
      });
    }
  });
});

router.post('/password', (req, res) => {
  console.log(req.headers.host);
  console.log(req.headers);
  if (req.headers.origin !== 'https://chatuniverse.vercel.app') {
    return res.send('Not Allowed');
  }
  UserSchema.findOneAndUpdate({ email: req.body.email }, { password: req.body.password })
    .then((e) => {
      e.token = '';
      const newObj = {
        name: e.name,
        userName: e.userName,
        password: req.body.NewPass,
        email: e.email,
        token: '',
      };
      const Token = jwt.sign(newObj, process.env.Secret);
      req.body.token = Token;
      UserSchema.findOneAndUpdate({ email: req.body.email }, { token: Token })
        .then(() => {
          res.send({ status: 200, message: 'Password Changed successfully', authToken: Token });
        }).catch(() => {
          res.send({ status: 200, message: 'Password not Changed, Internal server error 402' });
        });
    }).catch(() => {
      res.send({ status: 400, message: 'Password not Changed, Internal server error 404' });
    });
});

module.exports = router;
