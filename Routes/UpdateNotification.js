const express = require('express');
const User = require('../Schema/User');

const router = express.Router();

router.post('/', (req, res) => {
  const UpdateNotif = {
    notifyID: req.body.id,
    enabled: req.body.enabled,
  };
  User.findOneAndUpdate({ userName: req.body.userID }, { notification: UpdateNotif })
    .then(() => {
      res.status(200).send({ status: 'Updated' });
    });
  // jwt.verify(req.headers.authtoken, process.env.Secret, (err, response) => {
  //   User.find({ userName: response.userName }).then((e) => {
  //     res.send(e[0].friends);
  //   });
  // });
});

module.exports = router;
