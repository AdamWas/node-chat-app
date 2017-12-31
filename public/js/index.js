$('input[name="name"], input[name="room"]').keyup(function(){
  if ($('.name').val() && $('.room').val()) {
    $('.chat-join').prop('disabled', false);
    $('.login-form').prop('action', '/chat.html');
  } else {
    $('.chat-join').prop('disabled', true);
  }
});
