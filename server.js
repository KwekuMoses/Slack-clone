//* Länka ihop socket med express
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

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

//* När någon connectar till socket.io server
io.on("connection", (socket) => {
  //? Arbitrary string? - TEST

  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    //* Emit users array till alla -> io = server side
    io.emit("new user", users);
  });

  //*När någon joinar ett rum
  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
  });

  //* TO is used for functionality of either a group name or individual ID, chatname only relevant in certain instances.
  //*? socket.to(to) is defined via client-side
  socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    //* Om det är en kanal
    if (isChannel) {
      const payload = {
        content,
        //* Objektivt namn, samma för alla till gruppchat
        chatName,
        sender,
      };
      socket.to(to).emit("new message", payload);
    } else {
      //* Starta ny privat chat
      const payload = {
        content,
        //* Namnet på personen man vill skriva till vid individuell chat
        chatName: sender,
        sender,
      };
      socket.to(to).emit("new message", payload);
    }
    //*? chatName is defined via client-side
    //* Då det finns ett rum sedan tidigare
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content,
      });
    }
  });
  socket.on("disconnect", () => {
    //* Filtrera bort användaren som disconnectar och emit ny users array
    users = users.filter((u) => u.id !== socket.id);
    io.emit("new user", users);
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
