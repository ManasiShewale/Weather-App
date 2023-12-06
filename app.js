const express = require("express");
const app = express();
const BodyParser = require("body-parser")
app.use(BodyParser.urlencoded({ extended: true }));
const https = require("https");

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    const query = req.body.cityName
    const apiKey = "aebfdc3af62d1555a5d2be51aba5f4d1"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const discription = weatherData.weather[0].main
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
            console.log(discription);
            res.write("<p>Weather is currently " + discription + ".</p>")
            res.write("<h1>The temperature of " + query + " is " + temp + " degree celcius</h1>")
            res.write("<img src=" + imageURL + ">");
        })
    })

})

app.listen(8000, function() {
    console.log("Server is started on port 8000")
})