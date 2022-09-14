const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post(
  "/uploadfile",
  upload.array("file_lists", 10),
  function (req, res, next) {
    if (req.files) {
      res.sendFile("index.html");
    }
  }
);

app.listen(4000);
