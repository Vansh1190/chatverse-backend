const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyRequest = (req, res, next) => {
  // res.send('hello');
  console.log(req.headers);
  if (req.headers.authtoken) {
    jwt.verify(req.headers.authtoken, process.env.Secret, ((err, response) => {
      if (err) {
        return res.status(404).send({ message: 'Invalid UserID', status: 400 });
      }
      req.body.UserData = response;
      next();
      return true;
    }));
  }
  if (!req.headers.authtoken) {
    return res.status(404).send({ message: 'User not logged in, login first', status: 401 });
  }
  return true;
};

module.exports = verifyRequest;
