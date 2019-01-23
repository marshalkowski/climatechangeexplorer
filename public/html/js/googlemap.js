var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.68, lng: -73.5},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  map.addListener('click', function(e) {
    if (!chart && !chartLoading)
    {
      getStationData(e.latLng);
    }
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      //infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(){}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}

//THIS IS WHERE WE PASS THE LOCATION TO THE WEATHER API
function onLocationConfirm(latLng)
{
  console.log("Latitude is " + shorten(latLng.lat()));
}

function shorten(num)
{
  return num.toFixed(2);
}


//this is basically the same code as in getChartData from dialog.js
//just modified to call the dialog window once it's complete
function getStationData(latLng)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //changed callback to toggleDialog, so when the backend does it's thing,
        //it will call the dialog window, passing the station(s) nearby
         //var obj = JSON.parse(this.responseText);
         //console.log(obj[0].label);
         toggleDialog(JSON.parse(this.responseText));
        }
    };

    var url = "http://localhost:3000/tempData/" + latLng.lat() + "/" + latLng.lng() + "/";
//    var url = "http://localhost:3000/stationId/" + latLng.lat() + "/" + latLng.lng() + "/";
    xhttp.open("GET", url, true);
    xhttp.send();
}
