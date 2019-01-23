var overlay = true;

function toggleOverlay(msg){
  if (overlay)
  {
    overlay = false;
    var overElem = document.getElementById('overlay');
    overElem.style.display = "none";
  }
}