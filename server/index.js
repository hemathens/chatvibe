const express = require('express');
const http = require('http');
const { app, server } = express();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data); // Broadcast message
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data); // Broadcast typing
  });

  socket.on('readReceipt', (data) => {
    console.log(`${data.user} read message ${data.messageId}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});