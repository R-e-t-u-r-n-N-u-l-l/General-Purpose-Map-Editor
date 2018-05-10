const ImageLoaderData = {
  inputTag:     null,
  inputField:   null,
  loadedImage:  null,
  display:      null
};

function initImageLoader() {
  ImageLoaderData.inputField  = document.querySelector('#inputfield');
  ImageLoaderData.inputTag    = document.querySelector('#inputfield > input');
  ImageLoaderData.display     = document.querySelector('#sprite_canvas');

  ImageLoaderData.display.width   = ImageLoaderData.inputField.getBoundingClientRect().width;
  ImageLoaderData.display.height  = ImageLoaderData.inputField.getBoundingClientRect().height;

  ImageLoaderData.inputField.addEventListener('dragover', onFileOver);
  ImageLoaderData.inputField.addEventListener('drop', onFileDrop);

  ImageLoaderData.inputTag.addEventListener('change', onInputChange);
}

function processImage(file) {
  document.querySelector('#inputfield > label > span').classList.add('hidden');

  ImageLoaderData.loadedImage = new Image();
  ImageLoaderData.loadedImage.src = window.URL.createObjectURL(file);

  ImageLoaderData.loadedImage.onload = function() {
    if(ImageLoaderData.loadedImage.height < ImageLoaderData.loadedImage.width) {
      var width   = ImageLoaderData.display.width;
      var height  = ImageLoaderData.display.width * (ImageLoaderData.loadedImage.height / ImageLoaderData.loadedImage.width);
    }
    else {
      var height  = ImageLoaderData.display.height;
      var width   = ImageLoaderData.display.height * (ImageLoaderData.loadedImage.width / ImageLoaderData.loadedImage.height);
    }
    ImageLoaderData.display.getContext('2d')
      .clearRect(0, 0, ImageLoaderData.display.width, ImageLoaderData.display.height);
    ImageLoaderData.display.getContext('2d')
      .drawImage(
        ImageLoaderData.loadedImage,
        (ImageLoaderData.display.width - width) / 2,
        (ImageLoaderData.display.height - height) / 2,
        width, height);
  }
}

function onFileDrop(e) {
  e.preventDefault();
  processImage(e.dataTransfer.files[0]);
}

function onInputChange(e) {
  e.preventDefault();
  processImage(ImageLoaderData.inputTag.files[0]);
}

function onFileOver(e) {
  e.preventDefault();
}
