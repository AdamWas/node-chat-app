const expect = require('expect');
const {Users} = require('./users');
const {users, populateUsers} = require('./seed');

const {isRealString, isUniqueName} = require('./validation');

beforeEach(populateUsers);

describe('isRealString', () => {
  it('should return true for valid string', () => {
    var str = '   Jen   ';
    var message = isRealString(str);

    expect(typeof message === 'boolean');
    expect(message).toBe(true);
  });

  it('should return false for space-only string', () => {
    var str = "   ";
    var message = isRealString(str);

    expect(typeof message === 'boolean');
    expect(message).toBe(false);
  });

  it('should return false for invalid object', () => {
    var str = {
      name: 'Jen'
    };
    var message = isRealString(str);

    expect(typeof message === 'boolean');
    expect(message).toBe(false);
  });
});

describe('isUniqueName', () => {
  it('should return false for non-unique name', () => {
    var varification = isUniqueName(users, 'Jen', 'Room1');

    expect(typeof varification === 'boolean');
    expect(varification).toBe(false);
  });

  it('should return true for unique name', () => {
    var varification = isUniqueName(users, 'PanX', 'Room1');

    expect(typeof varification === 'boolean');
    expect(varification).toBe(true);
  });
});
