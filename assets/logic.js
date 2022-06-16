// grab form input
//fetch request using template literals for lat and longitude
//store lat and logitude in variables
// send lat and log variables into second fetch request for weather
//grab city name, date, icon of weath conditions, temperature, humidity, wind speed, UV
//conditional statement for color of uv index of favorable moderate or servere

//grab five day forecast, 
//grab date, icon, and temperature, wind speed, and humidity


//add search to local storage
// click event to call this function again
var userInput = //grab user input from search bar
;
var url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput},840&limit=1&appid=d9e6c47cd1a84b43c7eae83b3f67b82b`;

fetch(url)
.then(response => response.json())
.then(data => data.response);

var lat = data.response.lat;
var long = data.response.lon;

var weatherFetchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly&appid=d9e6c47cd1a84b43c7eae83b3f67b82b`;

fetch(weatherFetchUrl)
.then(response => response.json())
.then(data => {
     weatherRender(data.response)});

function weatherRender(resultObj){



}