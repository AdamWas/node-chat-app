var socket = io();

// scrolling control
function scrollToBottom() {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  };
};

socket.on('connect', function() {
  // console.log('Connected to the server');
  var params = jQuery.deparam(window.location.search);

  // if (params.room && params.name){
  socket.emit('join', params, function(err) {
    if (err) {
      window.location.href = '/';
      alert(err);
    } else {
      console.log('No errs!');
    };
  });
});

socket.on('updateUserList', function (users) {
  var ul = jQuery('<ul></ul>');

  users.forEach(function(user) {
    ul.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ul);
});

// crating new message from server data
socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('HH:mm')
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// crating location message from server data
socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('HH:mm')
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// section for SEND button
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('geolocation not supported')
  }

  // disabling button for short time
  // fetching location and sending to the server
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    // Sending location to the server
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  });
});
