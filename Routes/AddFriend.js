const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Schema/User');
require('dotenv').config();

const router = express.Router();
let RequestSent = false;
router.post('/', (req, res) => {
  jwt.verify(req.body.data.authToken, process.env.Secret, (err, response) => {
    let friendTemp = {
      userName: req.body.data.userID,
      room: req.body.data.userID + response.userName,
    };
    User.find({ userName: response.userName }).then(async (person) => {
      const ss = await User.find({ userName: req.body.data.userID });
      // console.log(ss);
      if (ss.length === 0) {
        return res.send('username not exist');
      }
      let alreadyIncluded = person[0].friends.some((ee) => {
        if (ee.userName === friendTemp.userName) {
          return true;
        }
        return false;
      });
      if (alreadyIncluded) {
        return res.send('Already you friend');
      }
      let newArr = (person[0].friends);
      newArr.push(friendTemp);

      User.findOneAndUpdate({ userName: response.userName }, { friends: newArr }).then(() => {
        RequestSent = true;
        // return res.send('Friend Added Successfully');
      }).then(() => {
        // adding friend on receiver side;
        friendTemp = {
          userName: response.userName,
          room: req.body.data.userID + response.userName,
        };
        if (RequestSent) {
          User.find({ userName: req.body.data.userID }).then(async (person2) => {
            const result = await User.find({ userName: response.userName });
            // console.log(ss);
            if (result.length === 0) {
              return res.send('username not exist');
            }
            alreadyIncluded = person2[0].friends.some((ee) => {
              if (ee.userName === friendTemp.userName) {
                return true;
              }
              return false;
            });
            if (alreadyIncluded) {
              return res.send('Already in your friends');
            }
            newArr = (person2[0].friends);
            newArr.push(friendTemp);
            User.findOneAndUpdate({ userName: req.body.data.userID }, { friends: newArr }).then(() => res.send('Friend Added Successfully'));
          });
        }
      }).catch(() => {
      });
      // End of adding friend on receiver side.
    }).catch(() => {
      res.send('error unable to add friend');
    });
  });
});

module.exports = router;
