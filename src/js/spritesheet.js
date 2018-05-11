const SpriteSheet = {
  currentTile: [0],
  width: 1,
  height: 1
};

var spritectx;
var spriteWidth, spriteHeight;
var spritexOffset, spriteyOffset;
var spritePrevX, spritePrevY;
var startX, startY;
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
    spriteHeight = ImageLoaderData.display.height;
    spriteWidth  = ImageLoaderData.display.height * (ImageLoaderData.loadedImage.width / ImageLoaderData.loadedImage.height);
  }

  spriteSize = (spriteWidth / (ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize));

  drawSpriteGrid();
}

function spriteDown(e) {
  spritePrevX = e.clientX - ImageLoaderData.display.getBoundingClientRect().left;
  spritePrevY = e.clientY - ImageLoaderData.display.getBoundingClientRect().top;

  if (e.button == 2)
    spriteDrag = true;
  if (e.button == 0) {
    startX = e.clientX - ImageLoaderData.display.getBoundingClientRect().left;
    startY = e.clientY - ImageLoaderData.display.getBoundingClientRect().top;
    SpriteSheet.currentTile[0] = Math.floor((startY - spriteyOffset) / spriteSize) * Math.ceil(ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize) + Math.floor((startX - spritexOffset) / spriteSize);
    SpriteSheet.width = 1;
    SpriteSheet.height = 1;
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

  if (Keys["Shift"]) {
    SpriteSheet.width = Math.floor((spritePrevX - spritexOffset) / spriteSize) - Math.floor((startX - spritexOffset) / spriteSize);
    SpriteSheet.height = Math.floor((spritePrevY - spriteyOffset) / spriteSize) - Math.floor((startY - spriteyOffset) / spriteSize);
    for (var i = 0; i < SpriteSheet.width; i++)
      for (var j = 0; j < SpriteSheet.height; j++)
        SpriteSheet.currentTile[j * SpriteSheet.width + i] = (Math.floor((startY - spriteyOffset) / spriteSize) + j) * Math.ceil(ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize) + (Math.floor((startX - spritexOffset) / spriteSize) + i);
  }

  if (spriteDrag || Keys["Shift"])
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

  spritectx.strokeRect(spritexOffset + SpriteSheet.currentTile[0] % Math.ceil(ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize) * spriteSize, spriteyOffset + Math.floor(SpriteSheet.currentTile[0] / Math.ceil(ImageLoaderData.loadedImage.width / ImageLoaderData.tilesize)) * spriteSize, spriteSize * SpriteSheet.width, spriteSize * SpriteSheet.height);
}
