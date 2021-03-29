const app = require("../app");
var express = require("express");
var router = express.Router(app);
const fileUpload = require("express-fileupload");
const path = require("path");
const User = require("../models/users");

router.use(
  fileUpload({
    createParentPath: true,
  })
);

router.get("/", function (req, res, next) {
  res.render("edit-profile");
});

//* från Docs: When you upload a file, the file will be accessible from req.files.
//*Posta en bild -> t.ex. Profilbild
router.post("/", (request, response) => {
  try {
    if (request.files) {
      let profile_pic = request.files.profile_pic;

      // console.log(profile_pic);

      //* Name är en egenskap som kommer med från express
      let file_name = `./uploads/${profile_pic.name}`;
      console.log("file_name::: " + file_name);

      User.findOneAndUpdate(
        { name: request.user.name },
        { profile_pic: file_name },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        }
      );

      //*mv är en inbyggd metod som hjälper oss ange vart filen ska hamna
      profile_pic.mv(file_name);
      response.render("view-profile", {
        images: [file_name],
      });
    } else {
      response.end("<h1>No file uploaded !</h1>");
    }
  } catch (error) {}
});

module.exports = router;
