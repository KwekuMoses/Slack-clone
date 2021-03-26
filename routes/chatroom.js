var express = require("express");
var app = require("../app");
var router = express.Router(app);

const Message = require("../models/message");

router.get("/", function (req, res, next) {
  console.log("chatroom.js -> at least the get request is working");
  res.render("chatroom");
});

router.post("/", function (request, response) {
  console.log("POST request to homepage");

  /*const { message } = request.body;
  console.log(request.body);
  //*Vi skapar en User med hjälp av vår model för users som ligger i models/users.js.
  const newMessage = new Message({
    message,
  });
  console.log(newMessage);

  newMessage
    .save()
    .then((value) => {
      response.redirect("/");
    })
    .catch((error) => console.log(error));*/
});

module.exports = router;
