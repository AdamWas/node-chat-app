const {Users} = require('./users');

var users = new Users();
users.users = [{
    id: 1,
    name: 'Mike',
    room: 'Room1'
  },{
    id: 2,
    name: 'John',
    room: 'Room2'
  },{
    id: 3,
    name: 'Jen',
    room: 'Room1'
}];

var userCopy = users;

const populateUsers = () => {
  return userCopy;
};


module.exports = {users, populateUsers}
