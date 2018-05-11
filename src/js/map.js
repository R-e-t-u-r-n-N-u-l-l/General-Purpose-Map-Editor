var mapCanvas, mapctx;
var mapxOffset, mapyOffset;
var mapDrag = false, mapDraw = false;
var mapPrevX, mapPrevY;
var validX, validY;
var mapSize;

function initMap() {
  mapCanvas = document.getElementById("map_canvas");
  mapCanvas.width = 0.45 * window.innerWidth;
  mapCanvas.height = mapCanvas.width;

  mapctx = mapCanvas.getContext("2d");
  mapctx.imageSmoothingEnabled = false;
  mapctx.strokeStyle  = "#555";
  mapctx.fillStyle    = "#222";

  mapxOffset = mapyOffset = 0;
  validX = validY = 0;

  mapCanvas.onmousedown = mapDown;
  mapCanvas.onmousemove = mapMove;
  mapCanvas.oncontextmenu = function(e) { e.preventDefault(); };

  mapSize = mapCanvas.width / MapLoader.width > mapCanvas.height / MapLoader.height ? mapCanvas.width / MapLoader.width : mapCanvas.height / MapLoader.height;

  drawMapGrid();
}

function mapDown(e) {
  if (e.button == 2)
    mapDrag = true;
  if (e.button == 0) {
    mapDraw = true;
    changeMap();
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
  mapxOffset = mapxOffset < -mapSize * MapLoader.width + mapCanvas.width ? -mapSize * MapLoader.width + mapCanvas.width : mapxOffset;
  mapyOffset = mapyOffset < -mapSize * MapLoader.height + mapCanvas.height ? -mapSize * MapLoader.height + mapCanvas.height : mapyOffset;

  if (mapDraw)
    changeMap();

  if (mapDraw || mapDrag)
    drawMapGrid();
}

function mapUp(e) {
  if (e.button == 2)
    mapDrag = false;
  if (e.button == 0) {
    mapDraw = false;
    validX = validY = 0;
  }
}

function changeMap() {
  if(Math.abs(Math.floor((mapPrevX - mapxOffset) / mapSize) - validX) >= SpriteSheet.width || Math.abs(Math.floor((mapPrevY - mapyOffset) / mapSize) - validY) >= SpriteSheet.height) {
    validX = Math.floor((mapPrevX - mapxOffset) / mapSize);
    validY = Math.floor((mapPrevY - mapyOffset) / mapSize);
    console.log(validX);
  } else
    return;
  for (var i = 0; i < SpriteSheet.width; i++) {
    for (var j = 0; j < SpriteSheet.height; j++) {
      if (Math.floor((mapPrevX - mapxOffset) / mapSize + i) < MapLoader.width)
        MapLoader.mapData[Math.floor((mapPrevY - mapyOffset) / mapSize + j) * MapLoader.width + Math.floor((mapPrevX - mapxOffset) / mapSize + i)] = SpriteSheet.currentTile[j * SpriteSheet.width + i];
    }
  }
}

function drawMapGrid() {
  mapctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  mapctx.beginPath();

  for (var i = 0; i < MapLoader.width; i++)
    for (var j = 0; j < MapLoader.height; j++)
        mapctx.drawImage(ImageLoaderData.loadedImage, ImageLoaderData.tilesize * Math.floor(MapLoader.mapData[j * MapLoader.width + i] % (ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize)),
        ImageLoaderData.tilesize * Math.floor(MapLoader.mapData[j * MapLoader.width + i] / (ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize)), ImageLoaderData.tilesize, ImageLoaderData.tilesize, mapxOffset + mapSize * i, mapyOffset + mapSize * j, mapSize, mapSize);

  for (var i = 1; i < MapLoader.width; i++) {
      mapctx.moveTo(mapxOffset + mapSize * i, 0);
      mapctx.lineTo(mapxOffset + mapSize * i, mapCanvas.height);
  }

  for (var i = 1; i < MapLoader.height; i++) {
      mapctx.moveTo(0, mapyOffset + mapSize * i);
      mapctx.lineTo(mapCanvas.width, mapyOffset + mapSize * i);
  }

  mapctx.stroke();
}
