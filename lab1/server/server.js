const express = require('express')
const app = express()
const https = require('https');
const apikey = "21a69f5fcbd8ca1e5aad18cd33ef0574";

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}));

app.listen(5000, function(err){
    if(err) console.log(err);
    })


app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  // res.send("post req received" + req.body.cityName);
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&units=metric&appid=" + apikey

  https.get(url, function(https_res) {
    https_res.on("data", function(data) {
      res.write("<h1> " + req.body.cityName + " weather is " + JSON.parse(data).weather[0].description) + "</h1>";
      res.write("<h1> " + req.body.cityName + " temp is " + JSON.parse(data).main.temp) + "</h1>";

      // console.log(JSON.parse(data).weather[0].icon );
      res.write('  <img src="' + "http://openweathermap.org/img/wn/" + JSON.parse(data).weather[0].icon + '.png"' + "/>");
      res.send();
    })
  });

})

//--1--//
// app.get('/', function (req, res) {
//   res.send('GET request to homepage')
// })
