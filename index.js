const express = require('express');

const app = express();
const port = 3002;
const cors = require('cors');
const Signup = require('./Routes/Signup');
const upload = require('./Routes/Middleware/upload');

const connectToMongo = require('./connectToMongo');
const AutoSignin = require('./Routes/AutoSignin');
const GenOtp = require('./Routes/GenOtp');
const Verify = require('./Routes/Verify');
const AddFriend = require('./Routes/AddFriend');
const AllFriends = require('./Routes/AllFriends');
const GetAllMessages = require('./Routes/GetAllMessages');
const AllUsers = require('./Routes/AllUsers');
const OnlineUsers = require('./Routes/OnlineUsers');
const UpdateNotification = require('./Routes/UpdateNotification');
const CheckUnReadMSG = require('./Routes/CheckUnReadMSG');
// const imageSc = require('./Schema/imageSc');
// const upload = multer({
//   dest: 'Public/',
//   filename: 'sss.jpg',
// });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());

connectToMongo();
app.post('/', (req, res) => {
  res.send('ChatVerse v1');
});
app.get('/', (req, res) => {
  res.send('ChatVerse v1');
});

app.post('/profile', upload.single('uploaded_file'), ((req, res) => {
  res.send('hello');
}));

app.use('/auth', Signup);
app.use('/auth/verify', Verify);
app.use('/auth/genotp', GenOtp);
app.use('/auto', AutoSignin);
app.use('/addfriend', AddFriend);
app.use('/allmessages', GetAllMessages);
app.use('/allfriends', AllFriends);
app.use('/allusers', AllUsers);
app.use('/onlineusers', OnlineUsers);
app.use('/updatenotifID', UpdateNotification); // Used to update notification id
app.use('/checkunreadmsg', CheckUnReadMSG);
app.listen(port, () => {
});
