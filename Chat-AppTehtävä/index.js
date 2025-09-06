'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

// Create a custom namespace for chat
const chatNamespace = io.of('/chat');

chatNamespace.on('connection', (socket) => {
  console.log('a user connected to chat namespace', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });

  socket.on('chat message', (data) => {
    console.log("Received message:", data); // DEBUG
    // Send message to specific room within the chat namespace
    chatNamespace.to(data.room).emit('chat message', data);
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
