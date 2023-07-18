const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = async (req, res, next) => {
  let LoggedIn = false;
  const { token } = req.headers;
  LoggedIn = jwt.verify(token, process.env.Secret, (err, response) => {
    if (!response) {
      res.status(401).send('Access denied USER NOT LoggedIn');
      return false;
    }
    if (response.verified === false) {
      return res.status(401).send({ message: 'User not verified, verify first', isVerified: false });
    }
    res.Userid = {
      UserName: response.userName,
      isVerified: response.verified,
    };
    return true;
  });

  if (LoggedIn) {
    next();
  }
};

module.exports = fetchUser;
