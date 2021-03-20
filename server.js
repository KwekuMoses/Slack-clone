//* Länka ihop socket med express
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/users");

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT START !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT START !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT START !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT START !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT START !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//* Array för users
let users = [];

const messages = {
  //* these arrays will hold the message object
  general: [],
  random: [],
  jokes: [],
  javascript: [],
};

const botName = "Lord Moses";

//* När någon connectar till socket.io server
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    //* Every socket has a unique random automatically generated id
    console.log(socket.id);
    const user = userJoin(socket.id, username, room);
    //* The room that the user joins comes from the url
    socket.join(user.room);

    //* Vi använder vår emit "message" i chatroom.ejs, när någon connectar skriver vi ut vår "message"
    socket.emit("message", formatMessage(botName, "Welcome to the chat"));

    //*  Vi använder vår emit "message" i chatroom.ejs, när någon connectar skriver vi ut vår "message"
    socket.broadcast.emit(
      "message",
      formatMessage(botName, "A user has joined the chat")
    );
  });
  console.log("socket user connected");

  //* Joina ett specifikt rum
  socket.join("some room");
  io.to("some room").emit("some event");

  //* hantera ett chat message event
  socket.on("chat message", (message) => {
    console.log("this is the sent message: " + message);
    io.emit("chat message", formatMessage("USER", message));
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit(
      "message",
      formatMessage(botName, "A user has left the chat")
    );
  });
});

//* Lyssna in server
server.listen(1337, () => {
  console.log("server is running on 1337");
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT END !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT END !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT END !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT END !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  CHAT END !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
