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

  ImageLoaderData.display.width   = ImageLoaderData.inputField.getBoundingClientRect().width * 0.8;
  ImageLoaderData.display.height  = ImageLoaderData.display.width;

  ImageLoaderData.inputField.addEventListener('dragover', onFileOver);
  ImageLoaderData.inputField.addEventListener('drop', onFileDrop);

  ImageLoaderData.inputTag.addEventListener('change', onInputChange);
}

function processImage(file) {
  var image = new Image();
  image.src = window.URL.createObjectURL(file);

  image.onload = function() {
    if(image.height < image.width) {
      var width   = ImageLoaderData.display.width;
      var height  = ImageLoaderData.display.width * (image.height / image.width);
    }
    else {
      var height  = ImageLoaderData.display.height;
      var width   = ImageLoaderData.display.height * (image.width / image.height);
    }
    ImageLoaderData.display.getContext('2d')
      .drawImage(
        image,
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
