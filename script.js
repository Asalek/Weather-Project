
const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){
	
	const url = "https://api.openweathermap.org/data/2.5/weather?q=Casablanca&appid=2346317352a24f926b0a0ad2dfa70b6e&unit=metric";
	
	https.get(url, function(response){
		//console.log(response);
		response.on("data", function(data){
			const wData = JSON.parse(data); // # JSON.stringify(data) => from json to string
			const wstatus = wData.weather[0].description;
			console.log(wData.weather[0].main);
			res.write("<h1> weather status in casablanca is : " + wstatus +"</h1>");
			res.send();
		});
	})
	// res.sendFile(__dirname + "/index.html");
});



app.listen(3000, function(){
	console.log("server running on port 3000");
})
