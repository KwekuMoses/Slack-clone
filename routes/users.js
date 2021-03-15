var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", (request, response) => {
  const { name, email, password } = request.body;

  let errors = [];

  console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);

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

module.exports = router;
