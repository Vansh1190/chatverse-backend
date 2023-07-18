const express = require('express');
const fetchUser = require('./fetchUser');

const router = express.Router();

router.get('/', fetchUser, (req, res) => {
  res.send(res.Userid);
});

module.exports = router;
