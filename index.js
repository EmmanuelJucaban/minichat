const express = require('express');
const http = require('http');

const PORT = 3001;
const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);

const chatArr = [];

io.on('connection', (socket) => {
  // console.log(socket);
  console.log('Someone connected from the front end');

  socket.on('clientToServerFetchMessages', (cb) => {
    cb(chatArr);
  });


});


server.listen(PORT, () => {
  console.log('Server running');
})

