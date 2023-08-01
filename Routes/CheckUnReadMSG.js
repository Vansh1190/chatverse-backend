const express = require('express');
const { default: axios } = require('axios');

const User = require('../Schema/User');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  User.findOne({ userName: req.body.userName }).then((e) => {
    const friend = e.friends.find((f) => f.room === req.body.roomID);
    if (friend.unReadMessages.isPendingRead) {
      axios.post('https://onesignal.com/api/v1/notifications', {
        include_player_ids: [e.notification.notifyID],
        contents: {
          en: req.body.messageToSend,
          es: 'Spanish Message',
        },
        headings: {
          en: req.body.sender,
        },
        app_id: 'a7443046-e175-4adf-8de9-c2a296e35359',
        name: 'New message',
        url: `https://chatuniverse.vercel.app/user/${req.body.roomID}/${req.body.sender}/${req.body.userName}`,
      }, {
        headers: {
          Authorization: process.env.NotifAuth,
          Accept: 'text/plain',
        },
      }).then(() => {
      }).catch((err) => {
        console.log(err.message);
      });
    }

    // console.log(e.notification);
    return e;
  });
  // console.log(user);
  // console.log(e);

  res.status(200).send({ status: 'Updated' });
  // .then(() => {
  // });
  // jwt.verify(req.headers.authtoken, process.env.Secret, (err, response) => {
  //   User.find({ userName: response.userName }).then((e) => {
  //     res.send(e[0].friends);
  //   });
  // });
});

module.exports = router;
