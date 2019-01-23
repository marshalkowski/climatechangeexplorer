dialog = false;
currentLatLng = null;

function toggleDialog(station_array)
{

    if (!dialog){
        var innerString = "";

        for(i=0;i<station_array.length;i++){
              innerString += '<label class="btn btn-dark' + (i==0?' active':'') + '"><input type="radio" name="radio_btn" value="' + station_array[i].station_id+'|'+station_array[i].label+'" ' + (i==0?'checked':'') +'>' + station_array[i].label + '</label>'
        }
        if(station_array.length>0){
              innerString += "</div></div><br><div class='row dialogrow'><button class='btn btn-success btn-vert-block dialogelement' onclick='getChartData()'>Proceed</button>";
        }

        var dialogWindow = document.getElementById("dialogwindow");
        dialogWindow.style.display = "block";
        var dialogText = document.getElementById("dialogtext");
        dialogText.innerHTML = '<p class="dialogelement">' + station_array.length + ' station(s) nearby : <br></p><div class="row dialogrow"><div class="btn-group-vertical btn-group-toggle" data-toggle="buttons">'
                                + innerString;
    }
    else
    {
        document.getElementById("dialogwindow").style.display = "none";
    }

    dialog = !dialog;

}



function dialogConfirm(){
    chartLoading = true;
    toggleDialog();
    getChartData();
}



function dialogCancel(){
    toggleDialog();
}



function closeDialog()
{
	var panel = document.getElementById("dialog");
    document.body.removeChild(panel);
}



function getChartData()
//function getChartData(station_id)
{
  var station_id = '';
  var station_name = '';
  var radio_btn = document.getElementsByName("radio_btn");
  var radio_btn_check=0;
  var idLabel;

  for(i=0;i<radio_btn.length;i++){
    if(radio_btn[i].checked == true) {
      //console.log(radio_btn[i].value);
      idLabel = radio_btn[i].value.split('|');
      station_id = idLabel[0];
      station_name = idLabel[1];
      radio_btn_check = 1;
    }
  }
  if(radio_btn_check == 0){

    alert('You need to choose a weather station or cancel.');

  } else {
    //alert(station_id);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        //console.log(JSON.parse(this.response));
        //the array we're looking for is stored as a Stirng in this.response
        //JSON.parse() converts a String written in Javascript Object Notation to actual
        //Javascript (so it converts the String of an Arry into an actual Array, in this case)
        showChart(JSON.parse(this.response), station_name); //this can stay the same, as it will pass back the same data we need (array of years and temperatures)
        }
    };
    //console.log("station_id: " + station_id);
    var url = "http://localhost:3000/tempData/" + station_id + "/";
    xhttp.open("GET", url, true);
    xhttp.send();
    toggleDialog();
  }
}
