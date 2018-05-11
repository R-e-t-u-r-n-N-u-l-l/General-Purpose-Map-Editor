const MapLoader = {
  mapData: [],
  width: 32,
  height: 32
}

function readMap(file) {
  if(file == undefined || file.type.split("/")[0] != "text")
    return;

  fetch(window.URL.createObjectURL(file)).then(function(response) { return response.text(); }).then(function(text) { processMapData(text); });
}

function processMapData(data) {
  var lines = data.split('\n');
  lines.replace(/ /g, '');

  MapLoader.width = parseInt(lines[0].split(",")[0]);
  MapLoader.height = parseInt(lines[0].split(",")[1]);

  for (var i = 1; i < lines.length; i++) {
    var values = lines[i].split(",");
    for (var j = 0; j < values.length; j++)
      MapLoader.mapData[(i - 1) * MapLoader.width + j] = parseInt(values);
  }

  initMap();
}
