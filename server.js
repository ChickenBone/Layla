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
app.get("/:id", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
})
app.get("/add", function(req, res){
  res.sendFile(__dirname + "/views/add.html")
})
app.post("/add", function (req, res) {
  if(req.body.text){
    fs.readFile("./public/data.json", (err, data)=>{
      data = JSON.parse(data)
      
      data.items.push({id: makeid(15), text: req.body.text})
      fs.writeFile("./public/data.json",JSON.stringify(data),()=>{
        res.send({"success": "text added"})
      })
    })
  }else{
    res.send({"err": "no text"})
  }
});
// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
const listener = app.listen(80, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}