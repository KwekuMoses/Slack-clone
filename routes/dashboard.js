var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("dashboard");
});

router.get("/edit-profile", function (req, res, next) {
  res.render("edit-profile");
});

router.get("/view-profile", function (req, res, next) {
  res.render("view-profile");
});

module.exports = router;
