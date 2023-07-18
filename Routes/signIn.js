const User = require('../Schema/User');

const signIn = async (req, res, next) => {
  User.find({ userName: req.body.userName }).then((found) => {
    // console.log(req.body.password, 'sss');
    if (req.body.password === found[0].password) {
      req.token = found[0].token;
      next();
      return '';
    }
    return res.status(400).send('UserName or password is invalid');
  }).catch(() => res.status(400).send('Username not found, Register first'));

  // next();
};

module.exports = signIn;
