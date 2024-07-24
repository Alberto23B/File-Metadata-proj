var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer");

var app = express();
const upload = multer({dest: "uploads/"})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  const name = req.file ? req.file.originalname : ""
  const type = req.file ? req.file.mimetype : ""
  const size = req.file ? req.file.size : 0 
  if (name || type || size) {
    try {
      res.json({
        "name" : name,
        "type" : type,
        "size" : size
      });
    } catch (err) {
      console.error(err);
      res.status("404").res.end("Error");
    }
  } else {
    res.status("404").res.end("Error");
  }
  
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
