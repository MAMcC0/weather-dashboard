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
   
    $("#city-name").attr("class","text-capitalize").text(userInput);


var url = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput},3166&limit=1&appid=d9e6c47cd1a84b43c7eae83b3f67b82b`;

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
                console.log(data);
                weatherRender(data)}
              );

}
 function weatherRender(resultObj){
//rende weather for hero section
                   
    
    var weatherIcon 
    var grabTime = moment.unix(resultObj.current.dt).format('MMM D');
    var dataString = $("#date").html(grabTime);
    
   
    $("#temp").text(resultObj.current.temp + " F");
    $('#wind').text(resultObj.current.wind_speed  + " mph");
    $('#humidity').text(resultObj.current.humidity + "%");
    var uviShow = $("#uv-show").text(" "+ resultObj.current.uvi + " ");


   ////uvi gauge
    if(uviShow <= 2){
        uviShow.attr("class", "bg-success text-white");
    } else if (uviShow > 2 && uviShow <= 5){
        uviShow.attr("class", "bg-info text-white");
    } else if( uviShow > 5 && uviShow <= 7 ){
        uviShow.attr("class", "bg-primary text-white");
    } else if (uviShow > 7 && uviShow <= 10 ){
        uviShow.attr("class", "bg-warning text-white");
    } else {
        uviShow.attr("class", "bg-danger text-white");
    }
    renderCard(resultObj);
}
///render card function
    function renderCard(resultObj){
    for (let i=0; i < 5; i++)
    {       
            var dayCard = $("<div>").attr({
                                             "class": "card p-2",
                                             "style" : "width: 14rem;"}).appendTo("#card-hold");
            var weatherIcon = $('<img>').attr({
                                            "src":`https://openweathermap.org/img/wn/${resultObj.daily[i].weather[0].icon}@2x.png`,
                                            "alt": "icon",
                                            "class": "card-img-top",
            })
            var dateCard = $("<h3>").attr("class", "text-center" ).text(moment.unix(resultObj.daily[i].dt).format('MMM D'))
            var tempCard = $("<p>").text("Temp: " + resultObj.daily[i].temp.day + ' F');
            var windCard = $("<p>").text( "Wind: "+ resultObj.daily[i].wind_speed + ' mph');
            var humidityCard = $("<p>").text("Humidity: " + resultObj.daily[i].humidity + " %");
            
            dayCard.append(dateCard, weatherIcon, tempCard, windCard, humidityCard)
            
            
        
     
       
      
    } };  
    


$("#search-btn").click(grabInput);

