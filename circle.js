let positionX = 100;
let positionY = 100;

let lastMouseX = 0;
let lastMouseY = 0;

let edge = 500;

function setup() {
  createCanvas(edge, edge);
}

function updatePosition(lastMouse, newMouse, position) {
  if (newMouse < -15) {
      return edge - 15;
  }
  if (newMouse > (edge+15)) {
      return newMouse - edge;
  }
  if (lastMouse < newMouse) {
      return position + 2;
  }
  if (lastMouse > 2 * newMouse) {
      return position - 2;
  }
  if (lastMouse > newMouse) {
      return position - 2;
  }
  return position + 1;
}

function draw() {
  background(128,128,128);
  noStroke();

  positionX = updatePosition(lastMouseX, mouseX, positionX);
  positionY = updatePosition(lastMouseY, mouseY, positionY);

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  circle(positionX, positionY, 30)
}
