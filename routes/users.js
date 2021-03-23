var express = require("express");
const app = require("../app");
var router = express.Router(app);

const User = require("../models/users");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../config/passport")(passport);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

//*Här hanterar vi vår form action från register.ejs
router.post("/register", (request, response) => {
  //* Request.body innehåller våra inputfält från register.ejs
  const { name, email, password } = request.body;
  //* Vi har en error array för att kunna printa ut eventuella error som uppstår
  let errors = [];
  //*checka att allt ser ut som det ska
  console.log(
    `routes/users.js -> Name: ${name}, Email: ${email}, Password: ${password}`
  );

  if (!name || !email || !password) {
    errors.push({ msg: "Please fill out all fields" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Use at least 6 characters for your password" });
  }

  if (errors.length > 0) {
    response.render("register", {
      errors,
      name,
      email,
      password,
    });
  } else {
    //*Vi skapar en User med hjälp av vår model för users som ligger i models/users.js.
    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.hash(password, 10, function (error, hash) {
      // Store hash in your password DB.
      newUser.password = hash;

      newUser
        .save()
        .then((value) => {
          request.flash("success_msg", "You have been registered!");
          response.redirect("/users/login");
        })
        .catch((error) => console.log(error));
    });
  }
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

//* Här hanterar vi vår post action som vi gör på login.ejs
router.post("/login", (request, response, next) => {
  //* Om användaren lyckas authentisera sig gör vi en redirect till /dashboard osv
  passport.authenticate("local", {
    successRedirect: `/dashboard`,
    failureRedirect: "/users/login",
    failureFlash: true,
  })(request, response, next);
  console.log(`routes/users.js ${request.name}`);
});

router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

router.get("/logout", (request, response) => {
  request.logout();
  request.flash("success_msg", "You have logged out");
  response.redirect("/users/login");
});

module.exports = router;
