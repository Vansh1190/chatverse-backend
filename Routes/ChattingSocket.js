const http = require('https');
const { Server } = require('socket.io');

const port = 3002;

const SocketA = () => {
  const server = http.createServer();
  // console.log("SOCKEA")
  const io = new Server(server, {
    cors: {
      origin: 'https://chatverse-backend.onrender.com:3002',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('connected');

    socket.on('disconnect', () => {
    });
    socket.on('sendMessage', (data) => {
      socket.to(data.room).emit('receiveMessage', data);
    });

    socket.on('join_room', (room) => {
      socket.join(room);
    });
  });
  server.listen(port, () => {
    console.log('listening on port', port);
  });
};

module.exports = SocketA;
