const express = require("express");
const app = express();
const fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/:id", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
})
app.post("/view/add/:viewtype/:id", function (req, res) {
  if (req.params.viewtype && req.params.id) {
    fs.readFile("./public/data.json", (err, data) => {
      data = JSON.parse(data)
      data.items.forEach((item) => {
        if (req.params.id == item.id) {
          item[`${req.params.viewtype}`] += 1
        }
      })
      fs.writeFile("./public/data.json", JSON.stringify(data), () => {
        res.send({
          "success": "view added"
        })
      })
    })
  } else {
    res.send({
      "failed": "failed"
    })
  }
})
app.get("/wyatt/add", function (req, res) {
  res.sendFile(__dirname + "/views/add.html")
})
app.post("/wyatt/add", function (req, res) {
  if (req.body.text) {
    var id = makeid(15)
    fs.readFile("./public/data.json", (err, data) => {
      data = JSON.parse(data)
      console.log(req.body.hidden)
      data.items.push({
        id: id,
        text: req.body.text,
        title: req.body.title,
        views: 0,
        shared: 0,
        hidden: req.body.hidden == "true" ? true : false
      })
      fs.writeFile("./public/data.json", JSON.stringify(data), () => {
        res.send({
          "data": "success",
          "url": "https://laylab.glitch.me/"+id 
        })
      })
    })
  } else {
    res.send({
      "err": "no text"
    })
  }
});
// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
const listener = app.listen(80, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}