const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = "Jen";
    var text = "Some message";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt === 'number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var lat = 15;
    var lon = 19;
    var from = 'Admin';
    var message = generateLocationMessage(from, lat, lon);
    var url = 'https://www.google.pl/maps?q=15,19'

    expect(typeof message.createdAt === 'number');
    expect(message).toInclude({from, url});
  });
});
