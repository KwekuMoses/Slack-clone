//* Länka ihop socket med express
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/users");

//* Array för users
let users = [];

const messages = {
  //* these arrays will hold the message object
  general: [],
  random: [],
  jokes: [],
  javascript: [],
};

const botName = " Lord Moses";

//* När någon connectar till socket.io server
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    //* Every socket has a unique random automatically generated id
    //* Here we define the properties of our user that we set up in utils/users.js and populate with data in public/js/chatroom with Qs library
    const user = userJoin(socket.id, username, room);
    //* The room that the user joins comes from the url
    socket.join(user.room);

    //* Vi använder vår emit "message" i chatroom.ejs, när någon connectar skriver vi ut vår "message". formatMessage definieras i utils/messages.js
    socket.emit(
      "message",
      formatMessage(botName, `Welcome to the chat ${user.username}`)
    );

    console.log(
      `server.js ->  (USERNAME: ${user.username}), (CURRENT ROOM: ${user.room}), (SOCKET ID: ${socket.id})`
    );

    //*  Vi använder vår emit "message" i chatroom.ejs, när någon connectar skriver vi ut vår "message"
    //*Broadcast to the user.room
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username}  has joined the chat`)
      );
  });
  console.log(`server.js -> A socket connected to a chatroom `);

  //* Joina ett specifikt rum
  socket.join("some room");
  io.to("some room").emit("some event");

  //* hantera ett chat message event
  socket.on("chat message", (message) => {
    console.log("this is the sent message: " + message);
    io.emit("chat message", formatMessage(`${user.username}, ${message}`));
  });
  socket.on("disconnect", () => {
    console.log("server.js -> A socket disconnected");
    socket.broadcast.emit(
      "message",
      formatMessage(botName, "A user has left the chat")
    );
  });
});

//* Lyssna in server
server.listen(1337, () => {
  console.log("server.js -> server is running on 1337");
});
