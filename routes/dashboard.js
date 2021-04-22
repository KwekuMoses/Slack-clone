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
let images = "";

//* Hämta in rumnamnen från databasen
router.get("/", function (req, res, next) {
  Room.find({})
    .exec()
    .then((result) => {
      return result;
    })
    .then((available_rooms) => {
      console.log("dashboard.js ->  " + available_rooms);

      let current_user = req.user;
      let username = req.user.name;
      let profile_pic = req.user.profile_pic;
      console.log("HÄR " + profile_pic);
      console.log(`dashboard.js -> Body of current user is :  ${current_user}`);
      console.log(`dashboard.js -> name of current user is :  ${username}`);
      res.render("dashboard", {
        data: { username, available_rooms, profile_pic },
      });
    });
});

router.get("/view-profile", function (req, res, next) {
  res.render("view-profile");
});

router.post("/", function (request, response) {

  response.redirect("back");
  
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
router.post("/upload-profile-pic", (request, response) => {
  try {
    if (request.files) {
      let profile_pic = request.files.profile_pic;

      //console.log(profile_pic);

      //* Name är en egenskap som kommer med från express
      let file_name = `./uploads/${profile_pic.name}`; //*todo Ligger rätt nu
      //*mv är en inbyggd metod som hjälper oss ange vart filen ska hamna
      profile_pic.mv(file_name);

      response.render("/", { images: [file_name] });
    } else {
      response.end("<h1>No file uploaded !</h1>");
    }
  } catch (error) {}
});

//* Ladda upp

module.exports = router;

//? Express.js, or simply Express, is a back end web application framework for Node.js.
//?
