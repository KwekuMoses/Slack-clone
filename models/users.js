const mongoose = require("mongoose");
//* Vi använder mongoose metoden Schema för att skapa en "mall" i vår mongoDB databas som vi fyller ut med hjälp av vår form i register.ejs
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//*Modellen skapar en kollektion som får namnet av vår första parameter med ett -s ... så userS, eller basketballplayerS osv.
const User = mongoose.model("User", UserSchema);

module.exports = User;

//* profile-photo-path spara från HTML
