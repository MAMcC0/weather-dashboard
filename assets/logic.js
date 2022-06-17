let userInput;
var index = 0;
///function to grab input from search bar and geocode it to pass into weather api
function grabInput (){

    var userInput = $("#weather-search").val().trim();
   var userInputStore = JSON.parse(localStorage.getItem("userSearch")) || [];
   
   var newInput = [
    ...userInputStore,
     userInput,
   ];

   localStorage.setItem("userSearch", JSON.stringify(newInput));
   
    $("#city-name").text(userInput);


var url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput},3166&limit=1&appid=d9e6c47cd1a84b43c7eae83b3f67b82b`;

fetch(url)
    .then(response => response.json())
    .then(data => {
         weatherFetch(data)
    });

};
//function to grab data from weather api
function weatherFetch(resultObj) {
    
    var lat = resultObj[0].lat;
    
    var long = resultObj[0].lon;

    var weatherFetchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly&appid=d9e6c47cd1a84b43c7eae83b3f67b82b`;

    fetch(weatherFetchUrl)
        .then(response => response.json())
        .then(data => 
              {
                weatherRender(data)}
              );

}
 function weatherRender(resultObj){
//rende weather for hero section
                   
    
    var weatherIcon 
    var grabTime = moment.unix(resultObj.current.dt).format('MMM D');
    var dataString = $("#date").html(grabTime);
    
   
    $("#temp").text(resultObj.current.temp);
    $('#wind').text(resultObj.current.wind_speed);
    $('#humidity').text(resultObj.current.humidity);
    var uviShow = $("#uv-show").text(resultObj.current.uvi);


   ////uvi gauge
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
    }
    renderCard(resultObj);
}
///render card function
    function renderCard(resultObj){
    for (let i=0; i < 5; i++)
    {       
            var dateCard = $("<h3>").text(moment.unix(resultObj.daily[i].dt).format('MMM D'))
            var tempCard = $("<p>Temp:").text(resultObj.daily[i].temp.day);
            var windCard = $("<p>Wind:").text(resultObj.daily[i].wind_speed);
            var humidityCard = $("<p>Humidity:").text(resultObj.daily[i].humidity);
            
            $("#card-hold").append(dateCard, tempCard, windCard, humidityCard)
            
            
        
     
       
      
    } };  
    


$("#search-btn").click(grabInput);

