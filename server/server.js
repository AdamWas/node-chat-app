const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isUniqueName} = require('./utils/validation');
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// socket init
var io = socketIO(server);
// create empty array od users
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // when user joined to the room
  socket.on('join', (params, callback) => {
    // name and room verification
    var areStrings = (isRealString(params.name) && isRealString(params.room));
    var nameIsUnique = isUniqueName(users, params.name, params.room);
    if (!areStrings) {
    // if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    } else if (!nameIsUnique) {
    // } else if (!isUniqueName(users, params.name, params.room)) {
      return callback('Name is already exist');
    } else  if (areStrings && nameIsUnique){
      // socket method to JOIN to the room by room name
      socket.join(params.room);
      // removing user from user list (other room) by id
      users.removeUser(socket.id);
      // add user to the list by params
      users.addUser(socket.id, params.name, params.room);
      // send user list to the client
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      // initial message sent to the client
      socket.emit('newMessage',
      generateMessage('Admin', 'Welcome to ChatApp'));

      // new user message sent to the client
      socket.broadcast.to(params.room).emit('newMessage',
      generateMessage('Admin', `${params.name} has joined`));

      callback();
    }
  });

  // user message to the chat room
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room)
      .emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  // location message to the chat room with socket method
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      // emit to the client with socket method
      io.to(user.room).emit('newLocationMessage',
      // coords from the client browser
      generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage',
      generateMessage('Admin', `${user.name} has left the room`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {users}
