const express = require("express");
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const app = require("express")();
const httpServer = require("http").createServer(app);
//require("./config/passport")(passport);
//* Länka ihop socket med express
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
  socket.on("join server"),
    (username) => {
      const user = {
        username,
        id: socket.id,
      };
      users.push(user);
      //* Emit users array till alla -> io = server side
      io.emit("new user", users);
    };

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
//* Koppla ihop app med databas
mongoose
  .connect("mongodb://localhost/kweku_slack_clone", {
    //*TODO String parser när vi skickar data till vår databas
    useNewUrlParser: true,
    //*TODO The useUnifiedTopology option removes support for several connection options that are no longer relevant with the new topology engine
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected.."))
  .catch((err) => console.log(err));

//*EJS
//*Tells express that you will be using ejs as your template enigne
app.set("view engine", "ejs");
//*När vi använder express Ejs modulen så kan vi skapa layout.ejs i vår views. Express kommer att leta upp den filen och använda den vid rendering
app.use(expressEjsLayout);

//*BodyParser
app.use(express.urlencoded({ extended: false }));

//*TODO express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//*Todo Passport
//* Session används av passport och flash
app.use(passport.initialize());
app.use(passport.session());

//*TODO use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//*Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));
