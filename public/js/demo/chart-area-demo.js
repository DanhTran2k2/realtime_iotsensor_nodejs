
var socket = io("http://localhost:7000");

var bui = 0;
var time;
var hum = 0;
var temp = 0;

// socket.on('buitime', (datatime) => {
//     // console.log(datatime);
//     time =datatime
// });

socket.on('node1', (data) => {
	var raw1 = JSON.parse(data);
	temp = raw1[0].temp;
	time = raw1[0].time;
	hum = raw1[0].hum;
	console.log(temp + "..." + time);

});

socket.on('bui', (data) => {
	var databui = JSON.parse(data);
	bui = databui[0].bui;
	time = databui[0].time;
	//console.log(bui + "..." + time);
});
socket.on('node3', (data) => {
	var rawgas = JSON.parse(data);
	vlgas = rawgas[0].val;
	
	//console.log(bui + "..." + time);
});

// Chart
var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};



function onRefresh(chart1) {
	chart1.config.data.datasets.forEach(function (datasetbui) {
		datasetbui.data.push({
			x: Date.now(),
			y: bui
		});
	});
}

var colorbui = Chart.helpers.color;
var configbui = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Giá trị bụi( µg/m3)',
			backgroundColor: colorbui(chartColors.red).alpha(0.5).rgbString(),
			borderColor: chartColors.red,
			fill: false,
			lineTension: 0,
			borderDash: [8, 4],
			
			data: []
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Cảm biến bụi PM2.5'
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 50000,
					ttl: 60000,
					refresh: 30,
					delay: 0,
					
					onRefresh: onRefresh
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Giá trị'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		plugins: {
			streaming: {
				frameRate: 3
			}
		}
	}
};

// window.onload = function () {

// };

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};


//nhiệt độ

function onRefreshTemp(chart2) {
	chart2.config.data.datasets.forEach(function (dataset2) {
		dataset2.data.push({
			x: Date.now(),
			y: temp
		});
	});
}

//độ ẩm



var color2 = Chart.helpers.color;
//nhiet đọ
var config2 = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Nhiệt độ( độ C)',
			backgroundColor: color2(chartColors.blue).alpha(0.5).rgbString(),
			borderColor: chartColors.blue,
			fill: false,
			lineTension: 0,
			borderDash: [8, 4],			
			data: []
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Giá trị nhiệt độ'
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 50000,
					ttl: 60000,
					refresh: 30,
					delay: 0,
					
					onRefresh : onRefreshTemp
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Giá trị'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		plugins: {
			streaming: {
				frameRate: 3
			}
		}
	}
};
//độ ẩm 
function onRefreshHum(chart3) {
	chart3.config.data.datasets.forEach(function (dataset3) {
		dataset3.data.push({
			x: Date.now(),
			y: hum
		});
	});
}

var color3 = Chart.helpers.color;
var config3 = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Độ ẩm(%)',
			backgroundColor: color3(chartColors.green).alpha(0.5).rgbString(),
			borderColor: chartColors.green,
			fill: false,
			lineTension: 0,
			borderDash: [8, 4],			
			data: []
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Giá trị độ ẩm'
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 50000,
					ttl: 60000,
					refresh: 30,
					delay: 0,
					
					onRefresh : onRefreshHum
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Giá trị'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		plugins: {
			streaming: {
				frameRate: 3
			}
		}
	}
};

//gas
function onRefreshGas(chart4) {
	chart4.config.data.datasets.forEach(function (dataset4) {
		dataset4.data.push({
			x: Date.now(),
			y: vlgas
		});
	});
}

var color4 = Chart.helpers.color;
var config4 = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Nồng độ (ppm)',
			backgroundColor: color4(chartColors.yellow).alpha(0.5).rgbString(),
			borderColor: chartColors.yellow,
			fill: false,
			lineTension: 0,
			borderDash: [8, 4],			
			data: []
		}]
	},
	options: {
		title: {
			display: true,
			text: 'Giá trị'
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 50000,
					ttl: 60000,
					refresh: 30,
					delay: 0,
					
					onRefresh : onRefreshGas
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Giá trị'
				}
			}]
		},
		tooltips: {
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		},
		plugins: {
			streaming: {
				frameRate: 3
			}
		}
	}
};

window.onload = function () {
	var ctx2 = document.getElementById('myChart2').getContext('2d');
	window.myChart2 = new Chart(ctx2, config2);

	var ctx1 = document.getElementById('BuiChart').getContext('2d');
	window.myChart1 = new Chart(ctx1, configbui);

	var ctx3 = document.getElementById('myChart3').getContext('2d');
	window.myChart3 = new Chart(ctx3, config3);
	var ctx4 = document.getElementById('myChart4').getContext('2d');
	window.myChart4 = new Chart(ctx4, config4);
};




