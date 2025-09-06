'use strict';

// Connect to the chat namespace
const socket = io('http://localhost:3000/chat');
const form = document.getElementById('form');
const messageInput = document.getElementById('m');
const nicknameInput = document.getElementById('nickname');
const roomSelect = document.getElementById('room');
const messages = document.getElementById('messages');

// Store chat history for each room
let chatHistory = {};

// join default room
socket.emit('join room', roomSelect.value);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (messageInput.value.trim() === '') return;

  const data = {
    nickname: nicknameInput.value || 'Anonymous',
    message: messageInput.value,
    room: roomSelect.value
  };

  socket.emit('chat message', data);
  messageInput.value = ''; 
});

socket.on('chat message', (data) => {
  // Store message in chat history
  if (!chatHistory[data.room]) {
    chatHistory[data.room] = [];
  }
  chatHistory[data.room].push(data);
  
  // Display the message
  displayMessage(data);
});

function displayMessage(data) {
  const item = document.createElement('li');
  item.textContent = `${data.nickname} (${data.room}) Sanoi: ${data.message}`;
  messages.appendChild(item);
}

roomSelect.addEventListener('change', () => {
  // Clear current display
  messages.innerHTML = ''; 
  
  // Load chat history for selected room
  const selectedRoom = roomSelect.value;
  if (chatHistory[selectedRoom]) {
    chatHistory[selectedRoom].forEach(msg => {
      displayMessage(msg);
    });
  }
  
  socket.emit('join room', selectedRoom);
});


