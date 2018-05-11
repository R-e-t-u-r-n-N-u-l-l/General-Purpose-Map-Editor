const MapLoader = {
  mapData: [],
  width: 32,
  height: 32
}

function initMapLoader() {
  for (var i = 0; i < MapLoader.width * MapLoader.height; i++)
    MapLoader.mapData[i] = 0;
}

function readMap(file) {
  if(file == undefined || file.type.split("/")[0] != "text")
    return;

  fetch(window.URL.createObjectURL(file)).then(function(response) { return response.text(); }).then(function(text) { processMapData(text); });
}

function processMapData(data) {
  data = data.replace(/ /g, '');
  data = data.replace(/\r/g, '');
  var lines = data.split('\n');

  MapLoader.width   = parseInt(lines[0].split(",")[0]);
  MapLoader.height  = parseInt(lines[0].split(",")[1]);

  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    for (var j = 0; j < values.length; j++)
      MapLoader.mapData[(i - 1) * MapLoader.width + j] = parseInt(values[j]);
  }

  initMap();
}

function downloadMap() {
  var data = MapLoader.width + ", " + MapLoader.height + '\n';

  for (var i = 0; i < MapLoader.height; i++) {
    for (var j = 0; j < MapLoader.width - 1; j++)
      data += MapLoader.mapData[i * MapLoader.height + j] + ", ";
    data += MapLoader.mapData[i * MapLoader.height + (MapLoader.width - 1)];
    data += '\n';
  }

  var link = document.createElement('a');
  link.download = 'map.txt';
  var blob = new Blob([data], {type: 'text/plain'});
  link.href = window.URL.createObjectURL(blob);
  link.click();
}
