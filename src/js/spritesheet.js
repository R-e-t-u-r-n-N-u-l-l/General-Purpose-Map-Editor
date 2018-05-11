const SpriteSheet = {
  currentTile: 0,
  width: 1,
  height: 1
};

var spritectx;
var spriteWidth, spriteHeight;
var spritexOffset, spriteyOffset;
var spritePrevX, spritePrevY;
var spriteSize;
var spriteDrag = false;

function initSpriteSheet() {
  spritectx = ImageLoaderData.display.getContext("2d");
  spritectx.strokeStyle = "#555"

  ImageLoaderData.display.onmousedown = spriteDown;
  ImageLoaderData.display.onmousemove = spriteMove;
  ImageLoaderData.display.oncontextmenu = function(e) { e.preventDefault(); };

  spritexOffset = spriteyOffset = 0;

  if(ImageLoaderData.loadedImage.height > ImageLoaderData.loadedImage.width) {
    spriteWidth  = ImageLoaderData.display.width;
    spriteHeight = ImageLoaderData.display.width * (ImageLoaderData.loadedImage.height / ImageLoaderData.loadedImage.width);
  }
  else {
    spriteWidth  = ImageLoaderData.display.height;
    spriteHeight = ImageLoaderData.display.height * (ImageLoaderData.loadedImage.width / ImageLoaderData.loadedImage.height);
  }

  spriteSize = (spriteWidth / (ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize));

  drawSpriteGrid();
}

function spriteDown(e) {
  spritePrevX = e.clientX - mapCanvas.getBoundingClientRect().left;
  spritePrevY = e.clientY - mapCanvas.getBoundingClientRect().top;

  if (e.button == 2)
    spriteDrag = true;
  if (e.button == 0) {
    SpriteSheet.currentTile = Math.floor((spritePrevY - spriteyOffset) / spriteSize) * Math.ceil(ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize) + Math.floor((spritePrevX - spritexOffset) / spriteSize);
    drawSpriteGrid();
  }
}

function spriteMove(e) {
  if (spriteDrag) {
    spritexOffset += e.clientX - ImageLoaderData.display.getBoundingClientRect().left - spritePrevX;
    spriteyOffset += e.clientY - ImageLoaderData.display.getBoundingClientRect().top - spritePrevY;
  }

  spritePrevX = e.clientX - ImageLoaderData.display.getBoundingClientRect().left;
  spritePrevY = e.clientY - ImageLoaderData.display.getBoundingClientRect().top;

  spritexOffset = spritexOffset > 0 ? 0 : spritexOffset;
  spriteyOffset = spriteyOffset > 0 ? 0 : spriteyOffset;
  spritexOffset = spritexOffset < -spriteWidth + ImageLoaderData.display.width ? -spriteWidth + ImageLoaderData.display.width : spritexOffset;
  spriteyOffset = spriteyOffset < -spriteHeight + ImageLoaderData.display.height ? -spriteHeight + ImageLoaderData.display.height : spriteyOffset;

  if (spriteDrag)
    drawSpriteGrid();
}

function spriteUp(e) {
  if (e.button == 2)
    spriteDrag = false;
}

function drawSpriteGrid() {
  spritectx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

  spritectx.strokeStyle = "#555"
  spritectx.lineWidth = 1;

  spritectx.drawImage(ImageLoaderData.loadedImage, spritexOffset, spriteyOffset, spriteWidth, spriteHeight);
  spritectx.beginPath();

  for (var i = 1; i < ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize; i++) {
    spritectx.moveTo(spritexOffset + spriteSize * i, 0);
    spritectx.lineTo(spritexOffset + spriteSize * i, ImageLoaderData.display.height);
  }

  for (var i = 1; i < ImageLoaderData.loadedImage.height / ImageLoaderData.tilesize; i++) {
    spritectx.moveTo(0, spriteyOffset + spriteSize * i);
    spritectx.lineTo(ImageLoaderData.display.width, spriteyOffset + spriteSize * i);
  }

  spritectx.stroke();

  spritectx.strokeStyle = "#3BBB3B"
  spritectx.lineWidth = 5;

  spritectx.strokeRect(spritexOffset + SpriteSheet.currentTile % Math.ceil(ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize) * spriteSize, spriteyOffset + Math.floor(SpriteSheet.currentTile / Math.ceil(ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize)) * spriteSize, spriteSize, spriteSize);
}
