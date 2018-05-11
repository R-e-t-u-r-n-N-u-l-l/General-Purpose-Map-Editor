const ImageLoaderData = {
  fileInput:    null,
  sizeInput:    null,
  inputField:   null,
  loadedImage:  new Image(),
  tilesize:     16,
  display:      null
};

function resizeImageLoader() {
  ImageLoaderData.display.style.width   = "100%";
  ImageLoaderData.display.style.height  = "100%";
  ImageLoaderData.display.width   = ImageLoaderData.display.offsetWidth;
  ImageLoaderData.display.height  = ImageLoaderData.display.offsetHeight;

  ImageLoaderData.display.getContext("2d").imageSmoothingEnabled = false;
  drawLoadedImage();
  initSpriteSheet();
}

function initImageLoader() {
  ImageLoaderData.inputField  = document.querySelector("#inputfield");
  ImageLoaderData.fileInput   = document.querySelector("#inputfield > #file");
  ImageLoaderData.sizeInput   = document.querySelector("#inputfield > #tilesize");
  ImageLoaderData.display     = document.querySelector("#sprite_canvas");

  ImageLoaderData.display.style.width   = "100%";
  ImageLoaderData.display.style.height  = "100%";
  ImageLoaderData.display.width   = ImageLoaderData.display.offsetWidth;
  ImageLoaderData.display.height  = ImageLoaderData.display.offsetHeight;

  ImageLoaderData.inputField.addEventListener("dragover", onFileOver);
  ImageLoaderData.inputField.addEventListener("drop", onFileDrop);

  ImageLoaderData.fileInput.addEventListener("change", onFileInput);
  ImageLoaderData.sizeInput.addEventListener("change", onTilesizeChange);

  ImageLoaderData.display.getContext("2d").imageSmoothingEnabled = false;
}

function processImage(file) {
  if(file == undefined || file.type.split("/")[0] != "image")
    return;

  document.querySelector("#inputfield > label").classList.add("hidden");
  ImageLoaderData.loadedImage.src = window.URL.createObjectURL(file);
  ImageLoaderData.loadedImage.onload = function() {
    drawLoadedImage();
    drawMapGrid();
    initSpriteSheet();
  }
}

function drawLoadedImage() {
  if(ImageLoaderData.loadedImage.height > ImageLoaderData.loadedImage.width) {
    var width   = ImageLoaderData.display.width;
    var height  = ImageLoaderData.display.width * (ImageLoaderData.loadedImage.height / ImageLoaderData.loadedImage.width);
  }
  else {
    var height  = ImageLoaderData.display.height;
    var width   = ImageLoaderData.display.height * (ImageLoaderData.loadedImage.width / ImageLoaderData.loadedImage.height);
  }
  ImageLoaderData.display.getContext("2d")
    .clearRect(0, 0, ImageLoaderData.display.width, ImageLoaderData.display.height);
  ImageLoaderData.display.getContext("2d")
    .drawImage(
      ImageLoaderData.loadedImage, 0, 0, width, height);
}

function onFileDrop(e) {
  e.preventDefault();
  processImage(e.dataTransfer.files[0]);
  readMap(e.dataTransfer.files[0]);
}

function onFileInput(e) {
  e.preventDefault();
  processImage(ImageLoaderData.fileInput.files[0]);
}

function onTilesizeChange(e) {
  e.preventDefault();
  ImageLoaderData.tilesize = parseInt(ImageLoaderData.sizeInput.value);
  drawMapGrid();
  initSpriteSheet();
}

function onFileOver(e) {
  e.preventDefault();
}
