const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const LocalStrategy = require("passport-local").Strategy;

//require("./config/passport")(passport);

//*TODO mongoose
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
app.listen(3000);
