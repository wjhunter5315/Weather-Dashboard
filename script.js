var APIKey = "039d220008220b797aca707e99972b77";

$("#confirm").on("click", function() {
    var location = document.querySelector(".myLocation").value;
    localStorage.setItem('locationPicks', location);
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&APPID=" + APIKey;
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
    .then(function(response) {
            console.log(weatherURL);
            console.log(response);
            var longNow = response.coord.lon;
            console.log(longNow);
            var latNow = response.coord.lat;
            console.log(latNow);
            var tempNow = response.main.temp;
            console.log(tempNow);
            var humidNow = response.main.humidity;
            console.log(humidNow);
            var windNow = response.wind.speed;
            console.log(windNow);
            var weatherIcon = response.weather[0].icon;
            console.log(weatherIcon);
            
            var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latNow + "&lon=" + longNow + "&APPID=" + APIKey;
            $.ajax({
                url: uvIndexURL,
                method: "GET"
            })
            .then(function(response) {
                console.log(response);
                var uvNow = response.value;
                console.log(uvNow);
                var uvBox = $("<div>").attr("id", 'uvTarget');
                // if (uvNow <= 2.9) {
                //     document.text.getElementById("uvTarget").style.backgroundColor = '#00ff00';
                // }
                // else if(uvNow < 5.9 && uvNow > 3) {
                //     document.getElementById("uvTarget").style.backgroundColor = '#ffff66';
                // }
                // else if(uvNow < 7.9 && uvNow > 6) {
                //     document.getElementById("uvTarget").style.backgroundColor = '#ff9933';
                // }
                // else if(uvNow < 10.9 && uvNow > 8) {
                //     document.getElementById("uvTarget").style.backgroundColor = '#ff0000';
                // }
                // else {
                //     document.getElementById("uvTarget").style.backgroundColor = '#9900cc';
                // }
                uvBox.append("Temperature : " + tempNow + "F" + "<br>" + "Humidity : " + humidNow + "%" + "<br>" + "Wind Speed : " + windNow + "MPH" + "<br>" + "UV Index : " + uvNow);
                $(".current-weather").append(uvBox);
                var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&APPID=" + APIKey;
                $.ajax({
                    url: forecastURL,
                    method: "GET"
                })
                .then(function(response) {
                    console.log(response);
                    var forecastList = response.list;
                    console.log(forecastList);
                    for (i=1; i<forecastList.length; i+=8) {
                        var forecastDiv = $("<card>");
                        var forecastDate = forecastList[i].dt_txt;
                        console.log(forecastDate);
                        var dateTrim = forecastDate.slice(0, 16);
                        var forecastTemp = forecastList[i].main.temp;
                        var forecastHumidity = forecastList[i].main.humidity;
                        var forecastIcon = forecastList[i].weather[0].icon;
                        var iconAt = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
                        var iconUsed = $("<img>").attr("src", iconAt);
                        forecastDiv.append(dateTrim + "<br>" + "Temperature : " + forecastTemp + "F" + "<br>" + "Humidity : " + forecastHumidity + "%");
                        $(".weather-forecast").append(forecastDiv);
                        $(".weather-forecast").append(iconUsed);
                    }

                })
    
            });

            
        console.log(location);
        localStorage.getItem('locationPicks');
        var prevSearch = $("<button>");
        prevSearch.append(location);
        $(".list-group").append(prevSearch);
        localStorage.clear();
    });

})
