const express = require('express');

const app = express();
const port = 3000;
const cors = require('cors');
const fileupload = require('express-fileupload');
const Signup = require('./Routes/Signup');

const connectToMongo = require('./connectToMongo');
const AutoSignin = require('./Routes/AutoSignin');
const GenOtp = require('./Routes/GenOtp');
const Verify = require('./Routes/Verify');
const SocketA = require('./Routes/ChattingSocket');
const AddFriend = require('./Routes/AddFriend');
const AllFriends = require('./Routes/AllFriends');

app.use(express.json());
app.use(cors());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));

connectToMongo();
app.post('/', (req, res) => {
  res.send('ChatVerse v1');
});
app.get('/', (req, res) => {
  res.send('ChatVerse v1');
});
app.use('/auth', Signup);
app.use('/auth/verify', Verify);
app.use('/auth/genotp', GenOtp);
app.use('/auto', AutoSignin);
app.use('/addfriend', AddFriend);
app.use('/allfriends', AllFriends);
SocketA();

app.listen(port, () => {
});
