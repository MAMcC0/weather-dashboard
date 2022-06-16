function grabInput (){
    
   
    var userInput = $("#weather-search").val().trim();
    var userDisplay = $(userInput).addClass('captialize');//fix
    $("#city-name").text(userDisplay);

    console.log(userInput);


//add search to local storage

var url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput},3166&limit=1&appid=d9e6c47cd1a84b43c7eae83b3f67b82b`;

fetch(url)
    .then(response => response.json())
    .then(data => {
         weatherFetch(data)
    });

};
function weatherFetch(resultObj) {
    
    var lat = resultObj[0].lat;
    
    var long = resultObj[0].lon;

    var weatherFetchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly&appid=d9e6c47cd1a84b43c7eae83b3f67b82b`;

    fetch(weatherFetchUrl)
        .then(response => response.json())
        .then(data => {
              weatherRender(data)});

}
 function weatherRender(resultObj){
//moment.js time function of dt objects
    var uviShow =$("#uv-show");
   var date = moment.utc(resultObj.current.dt).local().format();
   
   console.log(date);
    $("#date").text(date)

    $("#temp").text(resultObj.current.temp);

    $('#wind').text(resultObj.current.wind_speed);

    $('#humidity').text(resultObj.current.humidity);

    var uvi = resultObj.current.uvi; 
    if(uvi <= 2){
        uviShow.attr("class", "text-bg-success");
    } else if (uvi > 2 && uvi <= 5){
        uviShow.attr("class", "text-bg-info");
    } else if( uvi > 5 && uvi <= 7 ){
        uviShow.attr("class", "text-bg-primary");
    } else if (uvi > 7 && uvi <= 10 ){
        uviShow.attr("class", "text-bg-warning");
    } else {
        uviShow.attr("class", "text-bg-danger");
    }}



$("#search-btn").click(grabInput);