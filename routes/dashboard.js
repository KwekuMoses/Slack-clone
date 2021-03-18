var express = require("express");
var router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");

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

//**DYNAMIC PARAMS PÅ NÅGOT SÄTT HÄR */
router.get("/chat", function (req, res, next) {
  res.render("chat");
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
