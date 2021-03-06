const Keys = {};

window.onload = function(e) {
  initTools();
  initImageLoader();
  initMapLoader();
  initMap();
}

window.onclick = function(e) {

}

window.oncontextmenu = function(e) {
  e.preventDefault();
}

window.onmousedown = function(e) {

}

window.onmousemove = function(e) {

}

window.onmouseup = function(e) {
   mapUp(e);
   spriteUp(e);
}

window.onresize = function(e) {
  resizeImageLoader();
  initMap();
}

window.onkeydown = function(e) {
  Keys[e.key] = 1;
}

window.onkeyup = function(e) {
  delete Keys[e.key];
}

window.onblur = function(e) {
  for(var key in Keys)
    delete Keys[key];
}
