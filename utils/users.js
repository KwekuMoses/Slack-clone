//* Anything with users will go in here, when they join when they leave.. stuff like that
const users = [];

//*Join user to chat
function userJoin(id, username, room) {
  //*User is an object with id,username and room. In server.js we define these variables where we define our 'const user'
  //* Username hämtas från databasen
  const user = { id, username, room };
  users.push(user);

  //*We return the user when userJoin is called
  return user;
}

//*Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

//* User leaves chat
function userLeave(id) {
  //* Ger rätt indexplats
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    //* Ta bort 1 från "plats nummer index"
    return users.splice(index, 1)[0];
  }
}

//*Get room users

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
