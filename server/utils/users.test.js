const expect = require('expect');

const {Users} = require('./users');
const {populateUsers} = require('./seed');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = populateUsers();
  });

  describe('adding user', () => {
    it('should add new user', () => {
      var users = new Users();
      var user = {
        id: '123',
        name: 'John',
        room: 'Test Room'
      };

      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user])
    });
  });

  describe('getting user', () => {
    it('should return a user by id', () => {
      var user = users.getUser(users.users[0].id);
      expect(user.id).toBe(users.users[0].id);
    });

    it('should not return a user by invalid id', () => {
      var user = users.getUser(65);
      expect(user).toBe(undefined);
    });

    it('should return names for room', () => {
      var userList = users.getUserList('Room1');

      expect(userList).toEqual(['Mike', 'Jen']);
    });

    it('should return names for room', () => {
      var userList = users.getUserList('Room2');

      expect(userList).toEqual(['John']);
    });

    it('should return rooms', () => {
      var roomsList = users.getRoomsList();
      var roomsSet = new Set(['Room1', 'Room2'])
      expect(roomsList).toEqual(roomsSet);
    });
  });

  describe('deleting user', () => {
    it('should remove a user by id', () => {
      var userId = users.users[0].id;
      var user = users.removeUser(users.users[0].id);
      expect(users.length === 2);
      expect(user.id).toEqual(userId);
    });

    it('should not remove a user by invalid id', () => {
      var user = users.removeUser(4);
      expect(users.length === 3);
      expect(user).toBe(undefined);
    });
  });
});
