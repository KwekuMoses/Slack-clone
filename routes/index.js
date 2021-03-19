var express = require("express");
var app = require("../app");
var router = express.Router();

//const { ensureAuthenticated } = require("../config/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = router;
