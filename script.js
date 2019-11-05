var APIKey = "039d220008220b797aca707e99972b77";

$("#confirm").on("click", function() {
    var location = document.querySelector(".myLocation").value;
    localStorage.setItem('locationPicks', location);
    var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=" + APIKey;
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
    .then(function(response) {
            console.log(weatherURL);
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
            var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latNow + "&lon=" + longNow + "&APPID=" + APIKey;
            $.ajax({
                url: uvIndexURL,
                method: "GET"
            })
            .then(function(response) {
                console.log(response);
                var uvNow = response.value;
                console.log(uvNow);
                var uvBox = $("<div>");
                uvBox.append("Temperature : " + tempNow + "F" + "<br>" + "Humidity : " + humidNow + "%" + "<br>" + "Wind Speed : " + windNow + "MPH" + "<br>" + "UV Index : " + uvNow);
                $(".current-weather").append(uvBox);
    
            });

            for (i=7; i<forecastList.length; i+=8) {
                var forecastDiv = $("<div>");
                var forecastDate = forecastList[i].dt_txt;
                console.log(forecastDate);
                var forecastTemp = forecastList[i].main.temp;
                var forecastHumidity = forecastList[i].main.humidity;
                var forecastIcon = forecastList[i].weather[0].icon;
                var iconAt = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
                var iconUsed = $("<img>").attr("src", iconAt);
                forecastDiv.append(forecastDate + "<br>" + "Temperature : " + forecastTemp + "F" + "<br>" + "Humidity : " + forecastHumidity + "%");
                $(".weather-forecast").append(forecastDiv);
                $(".weather-forecast").append(iconUsed);
            }
    });

})
// if (uvNow <= 2.9) {  green = 0 - 2.9
// yellow = 3.0 - 5.9
// orange = 6.0 - 7.9
// red = 8.0 - 10.9
// violet = 11.0+