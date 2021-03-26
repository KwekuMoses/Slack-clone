const app = require("../app");
var express = require("express");
var router = express.Router(app);
const fileUpload = require("express-fileupload");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const Room = require("../models/rooms");

/* GET users listing. */

//* Hämta in rumnamnen från databasen
router.get("/:email", function (req, res, next) {
  Room.find({})
    .exec()
    .then((result) => {
      return result;
    })
    .then((result2) => {
      console.log(result2);

      let current_user = req.user;
      let username = req.user.name;
      console.log(`dashboard.js -> Body of current user is :  ${current_user}`);
      console.log(`dashboard.js -> name of current user is :  ${username}`);
      res.render("dashboard", { data: { username, result2 } });
    });
});

router.get("/edit-profile", function (req, res, next) {
  res.render("edit-profile");
});

router.get("/view-profile", function (req, res, next) {
  res.render("view-profile");
});

router.get("/chatroom", function (req, res, next) {
  res.redirect("chatroom");
});
router.post("/:email", function (request, response) {
  const { room } = request.body;
  console.log(request.body);
  const newRoom = new Room({
    room,
  });
  // console.log("NEW ROOM" + newRoom);
  // console.log(room);

  newRoom
    .save()
    .then((value) => {
      response.redirect(request.originalUrl);
      response.end();
    })
    .catch((error) => console.log(error));
});

//* Se variabeln file_name
router.use(
  fileUpload({
    createParentPath: true,
  })
);

//* Body parser som gör så att vi kan ta emot data
router.use(express.urlencoded({ extended: true }));

//*För att visa filerna ifrån uploads mappen */
//router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//* Hantera det som händer när vi submitar en bildfil
router.post("/view-profile", (request, response) => {
  try {
    if (request.files) {
      let profile_pic = request.files.profile_pic;

      //console.log(profile_pic);

      //* Name är en egenskap som kommer med från express
      let file_name = `./uploads/${profile_pic.name}`; //*todo Ligger rätt nu
      //*mv är en inbyggd metod som hjälper oss ange vart filen ska hamna
      profile_pic.mv(file_name);

      response.render("view-profile", { images: [file_name] });
    } else {
      response.end("<h1>No file uploaded !</h1>");
    }
  } catch (error) {}
});

module.exports = router;

//? Express.js, or simply Express, is a back end web application framework for Node.js.
//?
