var APIKey = "039d220008220b797aca707e99972b77";
  
    // Here we are building the URL we need to query the database
var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=30.68&lon=-88.29&APPID=" + APIKey;
var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=London&units=imperial&APPID=" + APIKey;
    // Here we run our AJAX call
$.ajax({
    url: weatherURL,
    method: "GET"
})
      // We store all of the retrieved data inside of an object called "response"
.then(function(response) {
        // Log the queryURL
        console.log(weatherURL);
        // Log the resulting object
        console.log(response);
        var longNow = response.city.coord.lon;
        console.log(longNow);
        var latNow = response.city.coord.lat;
        console.log(latNow);
        var tempNow = response.list[0].main.temp;
        console.log(tempNow);
        var humidNow = response.list[0].main.humidity;
        console.log(humidNow);
        var windNow = response.list[0].wind.speed;
        console.log(windNow);
        var weatherIcon = response.list[0].weather[0].icon;
        console.log(weatherIcon);
        var forecastList = response.list;
        console.log(forecastList);
        for (i=0; i<forecastList.length; i+=8) {
            var currentDiv = $("<div>");
            var currentTemp = forecastList[i].main.temp;
            // var tempF = (((currentTemp - 273) * 1.8) + 32);
            var currentHumidity = forecastList[i].main.humidity;
            var currentWind = forecastList[i].wind.speed;
            var currentIcon = forecastList[i].weather[0].icon;
            var iconAt = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
            var iconUsed = $("<img>").attr("src", iconAt);
            currentDiv.append("temperature : " + currentTemp + "F" + "<br>" + "humidity : " + currentHumidity + "%" + "<br>" + "wind speed : " + currentWind + "mph");
            $(".current-weather").append(currentDiv);
            $(".current-weather").append(iconUsed);
        }
});

$.ajax({
    url: uvIndexURL,
    method: "GET"
})
.then(function(response) {
    console.log(response);
    var uvNow = response.value;
    console.log(uvNow);

})
// var tempAvg = list[""0""].main.temp; weather?zip=36608,us&
// console.log(tempAvg);
// var currentCond = list[""0""].weather[""0""].description;
// console.log(currentCond);
