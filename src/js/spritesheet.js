const SpriteSheet = {
  currentTile: [],
  width: 1,
  height: 1
};

var spritectx;
var sheetxOffset, sheetyOffset;

function initSpriteSheet() {
  spritectx = ImageLoaderData.display.getContext("2d");
  spritectx.strokeStyle = "#555"

  sheetxOffset = sheetyOffset = 0;

  drawSpriteGrid();
}

function drawSpriteGrid() {
  spritectx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

  if(ImageLoaderData.loadedImage.height > ImageLoaderData.loadedImage.width) {
    var width   = ImageLoaderData.display.width;
    var height  = ImageLoaderData.display.width * (ImageLoaderData.loadedImage.height / ImageLoaderData.loadedImage.width);
  }
  else {
    var height  = ImageLoaderData.display.height;
    var width   = ImageLoaderData.display.height * (ImageLoaderData.loadedImage.width / ImageLoaderData.loadedImage.height);
  }

  spritectx.drawImage(ImageLoaderData.loadedImage, 0, 0, width, height);
  spritectx.beginPath();

  for (var i = 1; i < ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize; i++) {
    spritectx.moveTo(sheetxOffset + (width / (ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize)) * i, 0);
    spritectx.lineTo(sheetxOffset + (width / (ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize)) * i, ImageLoaderData.display.height);
  }

  for (var i = 1; i < ImageLoaderData.loadedImage.height / ImageLoaderData.tilesize; i++) {
    spritectx.moveTo(0, sheetyOffset + (height / (ImageLoaderData.loadedImage.height / ImageLoaderData.tilesize)) * i);
    spritectx.lineTo(ImageLoaderData.display.width, sheetyOffset + (height / (ImageLoaderData.loadedImage.height / ImageLoaderData.tilesize)) * i);
  }

  spritectx.stroke();
}
