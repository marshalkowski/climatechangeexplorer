const express = require("express");
const axios = require('axios');
const mysql = require('mysql');

//Constants
const app = express();
const DATABASE_SERVER = "bestbitstudios.com";
const DATABASE_NAME = "boardtob_cs510climatedata";
const CON_USERNAME = "boardtob_guest";
const CON_PASSWORD = "iamnotahacker";
/*NOTE: Your IP address may need to be
	whitelisted in order to query the database.
	For whitelisting, please contact benjamin.marshalkowski@my.ccsu.edu */ 

app.use(express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/js'));

//MYSQL database connection variables
const db_config = {
  host: DATABASE_SERVER,
  database: DATABASE_NAME,
  user: CON_USERNAME,
  password: CON_PASSWORD,
  connectTimeout: 0 //infinite connection-hopefully
};


//creates a connection--handles errors--COPIED FROM STACKOVERFLOW (the comments, too)
function handleDisconnect() {
  if (con) con.destroy();
  con = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con = mysql.createConnection(db_config); // Recreate the connection, since
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      console.log("Connection lost error, reconnecting...");
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      console.log("err code: " + err.code);
      throw err;                                  // server variable configures this)
    }
  });
}

app.get("/",function(req,res){
  res.sendFile('index.html');
});

app.get('/tempData/:lat/:lng/', function (req, res) {
  const params = req.params;
	getStationData(params['lat'], params['lng'], function(result){
    res.send(result);
  });
});

app.get('/tempData/:station_id/', function (req, res) {
  const params = req.params;
	getTemperatureData(params['station_id'], function(result){
    res.send(result);
  });
})

app.get('/allStations/', function(req, res){
	getAllStationLocations(function(result){
		res.send(result);
	});
})

app.listen(3000);

console.log("Running at Port 3000");

function query(sql, callback) {
  const con = mysql.createConnection(db_config);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.query(sql, function (err, result) {
      if (err) throw err;
      callback(result);
      con.end();
  });
}

function getStationData(lat, lng, callback) {
  query(`SELECT station_id, label, (
      3959 *
      acos(cos(radians(${lat})) *
      cos(radians(latitude)) *
      cos(radians(longitude) -
      radians(${lng})) +
      sin(radians(${lat})) *
      sin(radians(latitude)))
    ) AS distance
    FROM stations    
    ORDER BY distance LIMIT 0, 5;`,
    callback
  );
}

function getTemperatureData(stationId, callback) {
  query(`SELECT year, average_temperature
    FROM temperatures
    WHERE station_id = "${stationId}"
    ORDER BY year;`,
    callback);
}

function getAllStationLocations(callback) {
	query(`SELECT latitude, longitude
		FROM stations;`,
		callback);
}
