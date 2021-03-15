const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/users");

//*You are now importing passport-local with its Strategy instance for a user authentication mechanism with a simple username and password.
//*Since you will be comparing passwords this time, you need to decrypt the password that was returned by the database.
//*For this reason, you will also bring in bcrypt. Furthermore,
//*since you are essentially comparing passwords returned from the database, you will import User model for database-related operations.

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "that email is not registered",
            });
          }
          //match pass
          //* Password är inte krypterat, user.password är kr
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "pass incorrect" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  //* För att spara userobjekt i sessionen
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
