// const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ServerMail,
    pass: process.env.MailAuth,
  },
});
router.post('/', async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpString = otp.toString().substring(0, 6);
  let CheckMatch = false;
  jwt.verify(req.body.authToken, process.env.Secret, (err, response) => {
    if (response.email === req.body.email) {
      CheckMatch = true;
    }
  });
  if (!CheckMatch) {
    return res.status(400).send('Email did not match, please enter correct email.');
  }
  const mailOptions = {
    from: process.env.ServerMail,
    to: req.body.email,
    subject: `Your otp is ${otpString}`,
    text: `Your otp for verification with chatverse is ${otpString}`,
  };
  // res.send(otpString);

  transporter.sendMail(mailOptions).then(() => {
    res.send({ authOtp: otpString });
  }).catch(() => {
    // console.log(err);
    res.status(400).send('Our application is experiencing high traffic at this moment, please try again later');
  });
  return 'error';
});
module.exports = router;
