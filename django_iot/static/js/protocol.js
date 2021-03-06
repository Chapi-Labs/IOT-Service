var socket = io('http://45.55.162.243:4000');
var clients = [];
var map = ['chA', 'chB', 'chC', 'chD', 'Temp'];
var dataSetPerChannel = 1;
socket.on('connect', function() {
});
socket.on('send/device', function(dataDevice) {
  console.log(dataDevice);

  var found = clients.filter(findChart, dataDevice);
  if (found.length === 0) {
    var cant = calculateChannels(dataDevice, map);
    var cantGraphs = Math.ceil(cant/dataSetPerChannel);
    for (var i = 0; i < cantGraphs; i ++) {
      var dataSets = [];
      for (var j = 0; j < dataSetPerChannel; j++){
          //create new data set.
        if (i % dataSetPerChannel === 0) {
          var dataSet = {
            chartId: dataDevice.idDevice + (i + j),
            data: [parseFloat(dataDevice[map[i+j]])],
            label: 'Canal ' + map[i+j],
            borderColor: getRandomColor(),
            borderWidth: 1
          }
          dataSets.push(dataSet);
        }
      }
      console.log(dataSets);
      var canvas = document.createElement('canvas');
      canvas.id     = dataDevice.idDevice+i;
      canvas.width  = 300;
      canvas.height = 300;
      canvas.style.display = 'inline-block';
      var div = document.getElementById('charts')
      div.appendChild(canvas);
      var chart = insertChart(canvas, dataDevice.idDevice, dataSets, new Date(dataDevice.date).toLocaleTimeString());
      clients.push({
        deviceId: dataDevice.idDevice,
        chartId: dataDevice.idDevice+i,
        dataChart: dataSets,
        chart: chart
      });
    }
  //if chart id already saved
  } else {
    // chartId already contained
    // 1. search client with chartId
    // 2. add new data to client

    console.log(found);
    var cant = calculateChannels(dataDevice, map);
    var cantGraphs = Math.ceil(cant/dataSetPerChannel);
    console.log(cantGraphs, found.length);
    for (var i = 0; i < cantGraphs; i ++) {
      var dataSets = found[i].dataChart;
      var chart = found[i].chart;
      for (var j = 0; j < dataSetPerChannel; j++){
          //create new data set.
        if (i % dataSetPerChannel === 0) {
          var dataSet = dataSets[j].data;
          //dataSet.push(dataDevice[map[i]]);
          addData(chart, new Date(dataDevice.date).toLocaleTimeString(), parseFloat(dataDevice[map[i+j]]), j);
        }
      }
    }
    console.log(clients);
  }

});
socket.on('disconnect', function(){});
