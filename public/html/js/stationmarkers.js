var markers = false;
var mapMarkers = [];

function toggleStationMarkers(){
	if (markers == false){
		if (mapMarkers.length == 0)
		{
			getStationLocations();
		}
		else
		{
			showMarkers();
		}
		markers = true;
	}
	else
	{
		hideMarkers();
		markers = false;
	}
}

function createMarkers(queryResult){
	mapMarkers = queryResult.map(function (el) {
		var position = new google.maps.LatLng(el.latitude, el.longitude);
		var marker = new google.maps.Marker({
    		position: position,
    		map: map,
  		});
  		marker.setClickable(false);
  		return marker;
	});
}

function showMarkers(){
	for (var i = 0; i < mapMarkers.length; i++)
	{
		mapMarkers[i].setMap(map);
	}
}

function hideMarkers(){
	for (var i = 0; i < mapMarkers.length; i++)
	{
		mapMarkers[i].setMap(null);
	}
}

function getStationLocations(){

	var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         createMarkers(JSON.parse(this.responseText));
        }
    };

    var url = "http://localhost:3000/allStations/";

    console.log("about to make request!");

    xhttp.open("GET", url, true);
    xhttp.send();
    console.log("request sent!");
}