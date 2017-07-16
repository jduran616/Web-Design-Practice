/* A web app that currently takes your location (with permission) and gives you the
 * forcast for the week and the current temp

 * Uses the darksky API for weather details
 * and Google Maps API for autocomplete and
 * city name to coordinates conversion
 *
 * BUGS
 * #minutely not changing if data.minutely.summary exists after using
 * data.hourly.summary
 *
 * ToDo
 * Add dates to weekly forcast
 */

const dKey = con.dApi,
      gKey = con.gApi,
      days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      list = ["clear-day", "clear-night", "partly-cloudy-day",
      "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
      "fog"
    ];

var d = new Date(),
    // today = d.getDay(),
    name,
    lat,
    long;

function weather(latitude, longitude, city) {
  let today = d.getDay();
  if ( latitude === undefined ) {
    latitude = 37.7749;
  }

  if ( longitude === undefined ) {
    longitude = -122.4194;
  }

  if ( city === undefined  || city.length < 2) {
    city = "San Francisco";
  }

  let loc = document.getElementById("local"),
      url = "https://api.forecast.io/forecast/",
      icons = new Skycons({color: '#4b2332'}),
      dailyIcon = new Skycons({color: '#4b2332'});

    // loc.innerHTML = "Latitude : " + latitude + "° Longitude : " + longitude;
    $.getJSON(url + dKey + '/' + latitude + ',' + longitude + '?extended=daily&callback=?', function(data) {
      if(data === undefined) {
        $('#nin').html('<h1>Try another city</h1>');
        return;
      }
        if($('#temp canvas')) {
          $('#temp canvas').remove();
        }
        $('#temp').html("<canvas></canvas>" + city + "<br />" + Math.round(data.currently.temperature) + '° F');

        if(data.minutely === undefined) {
          $('#minutely').html(data.hourly.summary);
        } else {
          $('#minutely').html(data.minutely.summary);
        }

        $('#nin #temp canvas').attr("class", data.currently.icon);

        var skycon = data.currently.icon.toUpperCase().replace(/\-/g, '_');
        var el = document.getElementsByClassName(data.currently.icon);
        icons.set(el[0], window.Skycons[skycon]);

        if($('li').length > 7) {
          for(var l = 0; l <= 7; l++) {
            $('li').first().remove();
          }
        }

        for (var i = 0; i < data.daily.data.length; i++) {
          let x = days[today];
          $('#weekDays').append('<li> <canvas></canvas> <h3>' + x + '<br>' + Math.round(data.daily.data[i].temperatureMax) + '° F' + ' </h3></li>');
          $('#weekDays li:last canvas').attr("class", data.daily.data[i].icon);

          today++;

          if (today === 7) {
            today = 0;
          }
        }
        for(i = list.length; i--; ) {
          var dailySkycon = list[i],
              weeklyEl = document.getElementsByClassName( dailySkycon );
          for (e = weeklyEl.length; e--;){
              dailyIcon.set( weeklyEl[e], dailySkycon.toUpperCase().replace(/\-/g, '_'));
          }
        }
        dailyIcon.play();
        icons.play();
    });
  // }

}


function insertScript() {
  var gApi = document.createElement('script');

  gApi.src = 'https://maps.googleapis.com/maps/api/js?key='+ gKey +'&callback=init&libraries=places,geometry';
	document.body.appendChild(gApi);
};

function init() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city"));

	autocomplete.addListener('places_changed', function() {
		var place = autocomplete.getPlaces()[0];
    name = document.querySelector('#city').value;
    lat =  place.geometry.location.lat();
    long =  place.geometry.location.lng();
    // document.querySelector("#latitude").value =
	});
}

weather();
insertScript();
$('button').on('click', function() {
  weather(lat, long, name);
  return false;
});
