const express = require('express');
const User = require('../Schema/User');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res) => {
// //   const VerifiedUsers = [];
//   console.log(req.body.token);
  User.find({ token: req.body.token }).then((items) => {
    if (items.length === 0) {
      return res.send({ UserFound: false });
    }
    res.send({ UserFound: true });
  });
  // jwt.verify(req.headers.authtoken, process.env.Secret, (err, response) => {
  //   User.find({ userName: response.userName }).then((e) => {
  //     res.send(e[0].friends);
  //   });
  // });
});

module.exports = router;
