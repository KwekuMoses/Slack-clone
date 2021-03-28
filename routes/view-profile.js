const app = require("../app");
var express = require("express");
var router = express.Router(app);

router.get("/dashboard", function (req, res, next) {
  console.log(request.user);
  res.render("view-profile", { email });
});

/*
router.get("/", function (req, res, next) {
  let email = request.user.email;

  res.render(`dashboard/${email}`);
});
*/
module.exports = router;
