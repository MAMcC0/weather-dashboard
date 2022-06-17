let userInput;


function grabInput (){

    var userInput = $("#weather-search").val().trim();
   var userInputStore = JSON.parse(localStorage.getItem("userSearch")) || [];
   
   var newInput = [
    ...userInputStore,
     userInput,
   ];

   localStorage.setItem("userSearch", JSON.stringify(newInput));
   
    
    
    $("#city-name").text(userInput);

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
                   
    var uviShow =$("#uv-show").text(resultObj.current.uvi);
    var date = document.getElementById("date");
    var dataString = moment(resultObj.current.dt).format('L');
   
   console.log(dataString);
    $("#date").text(date)
    $("#temp").text(resultObj.current.temp);
    $('#wind').text(resultObj.current.wind_speed);
    $('#humidity').text(resultObj.current.humidity);

   
    if(uviShow <= 2){
        uviShow.attr("class", "text-bg-success");
    } else if (uviShow > 2 && uviShow <= 5){
        uviShow.attr("class", "text-bg-info");
    } else if( uviShow > 5 && uviShow <= 7 ){
        uviShow.attr("class", "text-bg-primary");
    } else if (uviShow > 7 && uviShow <= 10 ){
        uviShow.attr("class", "text-bg-warning");
    } else {
        uviShow.attr("class", "text-bg-danger");
    }}



$("#search-btn").click(grabInput);