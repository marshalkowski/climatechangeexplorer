chartLoading = false;
chart = false;
farenheit = true;

function showChart(temperatureArray, stationName)
{
	chartLoading = false;
	chart = true;
	document.getElementById("chartwindow").style.display = "block";
    makeChart(temperatureArray, stationName);
}

function makeChart(visArray, stationName){
	//store the trmperatures from visArray into an array of their own
	var minTemp = 1000;
	var maxTemp = -1000;

	var tempData = [];
	for (i = 0; i < visArray.length; i++)
	{
		var point = {
			x:visArray[i].year, 
			y:toFarenheit(visArray[i].average_temperature)
		};
		if(minTemp > point.y) minTemp = point.y;
		if(maxTemp < point.y) maxTemp = point.y;
		tempData.push(point);
	}

	var windowRange = 20;
	var trendData = [];
	for (i = 0; i < tempData.length; i++)
	{
		var tempValues = 0;
		var tempCount = 0;
		var start = Math.max(0, i - windowRange);
		var end = Math.min(tempData.length - 1, i + windowRange);
		for (j = start; j <= end; j++)
		{
			if ((tempData[j].x >= tempData[i].x - windowRange) && (tempData[j].x <= tempData[i].x + windowRange))
			{
				tempCount++;
				tempValues += tempData[j].y;
			}
		}
		var trendPoint = {
			x: tempData[i].x, 
			y: tempValues / tempCount
		};
		trendData.push(trendPoint);
	}

	//scaling the chart y-axis
	var deltaTemp = maxTemp - minTemp;
	minTemp = Math.floor(minTemp - deltaTemp * 0.2);
	maxTemp = Math.ceil(maxTemp + deltaTemp * 0.2);

	//accessing chart element and configuring
	let myChart = document.getElementById('myChart').getContext('2d');

	Chart.defaults.global.defaultFontFamily='Lato';
	Chart.defaults.global.defaultFontSize=18;
	Chart.defaults.global.defaultFontColor='#777';

	//making the chart with chart.js
	let massPopChart = new Chart(myChart,{
	  type:'line',  // bar, horizontal, pie, line, donut, radar, polarArea
	  data:{
	    datasets:[{
	    label:'Temperature (℉)',
	    data :tempData,
	    borderWidth: 1,
	    borderColor:'#777',
	    hoverBorderWidth:3,
	    hoverBorderColor:'#000',
	    fill:false,
	    lineTension:0,
	    pointBackgroundColor:'#777'
		},
		{
		label:'Trend (℉)',
		data :trendData,
		borderWidth: 1,
		borderColor:'RED',
		hoverBorderWidth:3,
		hoverBorderColor:'#000',
		fill:false,
		lineTension:0,
		pointBackgroundColor:'RED',
		pointRadius:0,
		backgroundColor:'rgba(1, 0.9, 0.9, 0.1)'
		}]
	  },
	  options:{
	    title:{
	      display:true,
	       text:'Temperatures at ' + stationName,
	       fontSize:25
	    },
	    legend:{
	      display:false,
	      position:'right',
	      labels:{
	        fontColor:'#000'
	      }
	    },
	    scales:{
	      xAxes:[{
	      	display: true,
	      	type: 'linear',
	      	ticks:{
	      		min: 1890,
	      		stepSize: 10,
	      		max: 2018
	      	}
	      }],
	      yAxes:[{
	        display:true,
	        ticks:{

	          suggestedMin:minTemp,
	          stepSize:(farenheit?5:1),
	          max:maxTemp
	        }
	      }]
	      
	    },
	    layout:{
	      padding:{
	        left:50,
	        right:0,
	        bottom:0,
	        top:0
	      }
	    },
	    tooltips:{
	      enabled:true
	    },
	    spanGaps: true
	  }
	});
}

function closeChart(){
	document.getElementById("chartwindow").innerHTML = '<div class="card-body"><button class="btn btn-outline-dark btn-sm" onclick="closeChart()">CLOSE</button><canvas id="myChart"></canvas></div>';
	document.getElementById("chartwindow").style.display = "none";
	chart = false;
}

function toFarenheit(celcius)
{
	var tempScale = document.getElementById("tempScaleOpt1");
	if (tempScale.checked){
		farenheit = true;
		return celcius * 1.8 + 32;
	}
	else
	{
		farenheit = false;
		return celcius;
	}
	
}
