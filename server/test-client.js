// test-client.js
const { io } = require('socket.io-client');
const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('🟢 Connected as', socket.id);

  // Join a room
  socket.emit('join-room', { roomId: 'room1', userId: 'alice' });

  // Listen for new messages
  socket.on('new-message', (msg) => {
    console.log('📩 new-message:', msg);
    process.exit(0);
  });

  // Send a test message
  setTimeout(() => {
    socket.emit('send-message', {
      roomId: 'room1',
      userId: 'alice',
      text: 'Hello from test-client!'
    });
  }, 500);
});
