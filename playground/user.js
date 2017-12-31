class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id){

  }

  getUser(id){

  }

  getUserList(room){
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }

}

users = new Users();
users.users = [{
  id: 1,
  name: 'Mike',
  romm: 'Room1'
},{
  id: 2,
  name: 'John',
  romm: 'Room2'
},{
  id: 3,
  name: 'Jen',
  romm: 'Room1'
}];

console.log(users);
