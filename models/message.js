const mongoose = require("mongoose");
//* Vi använder mongoose metoden Schema för att skapa en "mall" i vår mongoDB databas som vi fyller ut med hjälp av vår form i register.ejs
const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});
//*Modellen skapar en kollektion som får namnet av vår första parameter med ett -s ... så userS, eller basketballplayerS osv.
//* Det är första parameter värdet som refereras till vid en find
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
