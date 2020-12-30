var socket = io("http://localhost:7000");

var temp = 0;
var time;
// socket.on('buitime', (datatime) => {
//     // console.log(datatime);
//     time =datatime
// });

socket.on('node1', (data) => {
	var raw1 = JSON.parse(data);
	temp = raw1[0].temp;
	time = raw1[0].time;
	console.log(temp + "..." + time);

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


function onRefresh2(chart2) {
	chart2.config.data.datasets.forEach(function (dataset) {
		dataset.data.push({
			x: Date.now(),
			y: temp
		});
	});
}

var color = Chart.helpers.color;
var config = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Nhiệt độ( độ C)',
			backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
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
			text: 'Cảm biến nhiệt độ'
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 50000,
					ttl: 60000,
					refresh: 30,
					delay: 0,
					
					onRefresh2 : onRefresh2
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
	var ctx = document.getElementById('myChart2').getContext('2d');
	window.myChart2 = new Chart(ctx, config);
};