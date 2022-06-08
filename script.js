
const { response } = require("express");
const express = require("express");
const bodyParse = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(req, res){

	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

	console.log(req.body.cityInputName);

	const appid = "2346317352a24f926b0a0ad2dfa70b6e";
	const city = req.body.cityInputName;

	const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid + "&units=metric";
	https.get(url, function(response)
	{
		response.on("data", function(data)
		{
			try
			{
				const wData = JSON.parse(data); // # JSON.stringify(data) => from json to string
				const wstatus = wData.weather[0].description;
				const icon = wData.weather[0].icon;
				const urlIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
				console.log(wData.weather[0]);
				res.write("<h1> weather status in "+city+" is : " + wstatus +"</h1>");
				res.write("<p> means it's now "+wData.weather[0].main +"</p>");
				res.write("<p> The Temperature now is "+wData.main.temp +" celsuis</p>");
				res.write("<img src=" + urlIcon + ">");
				res.send();
			}
			catch{
				res.write(city + " not found, please enter a valid city");
				res.send();
			}
			});
		});

});


app.listen(3000, function(){
	console.log("server running on port 3000");
})
