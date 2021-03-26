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

module.exports = {
  userJoin,
  getCurrentUser,
};
