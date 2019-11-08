// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/add", function(req, res){
  res.sendFile(__dirname + "/views/add.html")
})
app.post("/add", function (req, res) {
  if(req.body.text){
    fs.readFile("./public/data.json", (err, data)=>{
      data = JSON.parse(data)
      data.items.push({text: req.body.text})
      fs.writeFile("./public/data.json",JSON.stringify(data),()=>{
        res.send({"success": "text added"})
      })
    })
  }else{
    res.send({"err": "no text"})
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});