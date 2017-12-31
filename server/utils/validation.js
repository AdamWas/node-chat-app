const {Users} = require('./users');
// const {users} = require('./../server');

var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

var isUniqueName = (usersList, name, room) => {
  var nameList = usersList.getUserList(room);
  var checkedName = nameList.filter((user) => user === name);
  if (checkedName.length === 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {isRealString, isUniqueName};
