var mapCanvas, mapctx;
var mapWidth, mapHeight;
var mapxOffset, mapyOffset;
var mapDrag = false, mapDraw = false;
var mapPrevX, mapPrevY;
var currentTile = 0;
var mapSize;
var map = [];

function initMap() {
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

  mapSize = mapCanvas.width / mapWidth > mapCanvas.height / mapHeight ? mapCanvas.width / mapWidth : mapCanvas.height / mapHeight;

  for (var i = 0; i < mapWidth * mapHeight; i++)
    map[i] = -1;

  drawMapGrid();
}

function mapDown(e) {
  if (e.button == 2)
    mapDrag = true;
  if (e.button == 0) {
    mapDraw = true;
    map[Math.floor((mapPrevY - mapyOffset) / mapSize) * mapWidth + Math.floor((mapPrevX - mapxOffset) / mapSize)] = currentTile;
    drawMapGrid();
  }

  mapPrevX = e.clientX - mapCanvas.getBoundingClientRect().left;
  mapPrevY = e.clientY - mapCanvas.getBoundingClientRect().top;
}

function mapMove(e) {
  if (mapDrag) {
    mapxOffset += e.clientX - mapCanvas.getBoundingClientRect().left - mapPrevX;
    mapyOffset += e.clientY - mapCanvas.getBoundingClientRect().top - mapPrevY;
  }

  mapPrevX = e.clientX - mapCanvas.getBoundingClientRect().left;
  mapPrevY = e.clientY - mapCanvas.getBoundingClientRect().top;

  mapxOffset = mapxOffset > 0 ? 0 : mapxOffset;
  mapyOffset = mapyOffset > 0 ? 0 : mapyOffset;
  mapxOffset = mapxOffset < -mapSize * mapWidth + mapCanvas.width ? -mapSize * mapWidth + mapCanvas.width : mapxOffset;
  mapyOffset = mapyOffset < -mapSize * mapHeight + mapCanvas.height ? -mapSize * mapHeight + mapCanvas.height : mapyOffset;

  if (mapDraw)
    map[Math.floor((mapPrevY - mapyOffset) / mapSize) * mapWidth + Math.floor((mapPrevX - mapxOffset) / mapSize)] = currentTile;

  if (mapDraw || mapDrag)
    drawMapGrid();
}

function mapUp(e) {
  if (e.button == 2)
    mapDrag = false;
  if (e.button == 0)
    mapDraw = false;
}

function drawMapGrid() {
  mapctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  mapctx.beginPath();

  for (var i = 0; i < mapWidth; i++) {
    for (var j = 0; j < mapHeight; j++) {
      if (map[j * mapWidth + i] == -1)
        mapctx.fillRect(mapxOffset + mapSize * i, mapyOffset + mapSize * j, mapSize * (i + 1), mapSize * (j + 1));
      else
        mapctx.drawImage(ImageLoaderData.loadedImage, ImageLoaderData.tilesize * (map[j * mapWidth + i] % (ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize)), ImageLoaderData.tilesize * Math.floor(map[j * mapWidth + i] / (ImageLoaderData.loadedImage.height / ImageLoaderData.tilesize)), ImageLoaderData.tilesize, ImageLoaderData.tilesize, mapxOffset + mapSize * i, mapyOffset + mapSize * j, mapSize, mapSize);
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
