function insertChart(canvas, sensor, sets, initial_label) {
  var ctx = canvas.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [initial_label],
        datasets: sets
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Mediciones Sensor ' + sensor
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
  });
  return myChart;
}
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function calculateChannels(data, map) {
  var cant = 0;
  for (var i = 0; i < map.length; i++) {
    if (data[map[i]] !== undefined) {
      cant += 1;
    }
  }
  return cant;
}

function findChart(element) {
  return element.deviceId === this.clientId;
}
function addData(chart, label, data, index) {
  chart.data.labels.push(label);
  chart.data.datasets[index].data.push(data);
  chart.update();
}
