var mapCanvas, mapctx;
var mapWidth, mapHeight;
var mapxOffset, mapyOffset;
var mapDrag = false;
var mapPrevX, mapPrevY;
var mapSize;
var map = [];

onload = createMap;

function createMap() {
  mapCanvas = document.getElementById("map_canvas");
  mapCanvas.width = 0.45 * window.innerWidth;
  mapCanvas.height = window.innerHeight - 0.05 * window.innerWidth;

  mapctx = mapCanvas.getContext("2d");
  mapctx.strokeStyle = "#555"

  mapWidth = 16;
  mapHeight = 64;

  mapxOffset = mapyOffset = 0;

  mapCanvas.onmousedown = mapDown;
  mapCanvas.onmousemove = mapMove;
  mapCanvas.oncontextmenu = function(e) { e.preventDefault(); };

  window.onmouseup = mapUp;

  mapSize = mapCanvas.width / mapWidth > mapCanvas.height / mapHeight ? mapCanvas.width / mapWidth : mapCanvas.height / mapHeight;

  for (var i = 0; i < mapWidth * mapHeight; i++)
    map[i] = -1;

  drawMapGrid();
}

function mapDown(e) {
  if (e.button == 2)
    mapDrag = true;

  mapPrevX = e.clientX - mapCanvas.getBoundingClientRect().left;
  mapPrevY = e.clientY - mapCanvas.getBoundingClientRect().top;
}

function mapMove(e) {
  if (mapDrag) {
    mapxOffset += e.clientX - mapCanvas.getBoundingClientRect().left - mapPrevX;
    mapyOffset += e.clientY - mapCanvas.getBoundingClientRect().top - mapPrevY;
    mapPrevX = e.clientX - mapCanvas.getBoundingClientRect().left;
    mapPrevY = e.clientY - mapCanvas.getBoundingClientRect().top;

    mapxOffset = mapxOffset > 0 ? 0 : mapxOffset;
    mapyOffset = mapyOffset > 0 ? 0 : mapyOffset;
    mapxOffset = mapxOffset < -mapSize * mapWidth + mapCanvas.width ? -mapSize * mapWidth + mapCanvas.width : mapxOffset;
    mapyOffset = mapyOffset < -mapSize * mapHeight + mapCanvas.height ? -mapSize * mapHeight + mapCanvas.height : mapyOffset;

    drawMapGrid();
  }
}

function mapUp(e) {
  if (e.button == 2)
    mapDrag = false;
}

function drawMapGrid() {
  mapctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  mapctx.beginPath();

  for (var i = 0; i < mapWidth; i++) {
    for (var j = 0; j < mapHeight; j++) {
      if (map[j * mapWidth + i] == -1)
        mapctx.fillRect(mapxOffset + mapSize * i, mapyOffset + mapSize * j, mapSize * (i + 1), mapSize * (j + 1));
      else
        mapctx.drawImage(image, tileSize * i, tileSize * j, tileSize * (i + 1), tileSize * (j + 1), mapxOffset + mapSize * i, mapyOffset + mapSize * j, mapSize * (i + 1), mapSize * (j + 1));
    }
  }

  for (var i = 1; i < mapWidth; i++) {
      mapctx.moveTo(mapxOffset + mapSize * i, 0);
      mapctx.lineTo(mapxOffset + mapSize * i, mapCanvas.height);
  }

  for (var i = 1; i < mapHeight; i++) {
      mapctx.moveTo(0, mapyOffset + mapSize * i);
      mapctx.lineTo(mapCanvas.width, mapyOffset + mapSize * i);
  }

  mapctx.stroke();
}
