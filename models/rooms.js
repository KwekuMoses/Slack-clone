const mongoose = require("mongoose");
//* Vi använder mongoose metoden Schema för att skapa en "mall" i vår mongoDB databas som vi fyller ut med hjälp av vår form i register.ejs
const RoomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
});
//*Modellen skapar en kollektion som får namnet av vår första parameter med ett -s ... så userS, eller basketballplayerS osv.
const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
