function initTools() {
  var tools = document.querySelectorAll('.tool:not(.hidden)');
  for(var i = 0; i < tools.length; i++) {
    tools[i].addEventListener('click', changeSelected);
  }
}

function changeSelected(e) {
  document.querySelector('.tool.selected').classList.remove('selected');
  e.target.parentNode.classList.add('selected');
}
