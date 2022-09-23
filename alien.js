let moveAmount = 5;
let boardSize = 400;
let objects = [];

function setup() {
  createCanvas(boardSize, boardSize);
  objects.push(["👾", 200, 200], ["🚀", 100, 300], ["🪐", 300, 100], ["🪐", 50, 150], ["☄️", 150, 50], ["☄️", 300, 300])
}

function draw() {
  background(220);
  noStroke();

  textSize(20);
  let collision = detectCollision();
  if (collision && objects[collision][0] == "🚀") {
    text("Time to go home! 🚀🚀🚀", 10,200);
  }
  if (collision && objects[collision][0] == "☄️") {
    text("Comet is not your friend", 80,200);
  }

  textSize(30);
  for (var j=objects.length-1; j>=0; j--) {
    text(objects[j][0], objects[j][1], objects[j][2])
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    objects[0][2] -= moveAmount
  }
  if (keyCode == DOWN_ARROW) {
    objects[0][2] += moveAmount
  }
  if (keyCode == RIGHT_ARROW) {
    objects[0][1] += moveAmount
  }
  if (keyCode == LEFT_ARROW) {
    objects[0][1] -= moveAmount
  }
}

function detectCollision() {
  for (var i=1; i<objects.length; i++) {
    if ((abs(objects[i][1] - objects[0][1]) < 20) && (abs(objects[i][2] - objects[0][2]) < 20)) {
      return i;
    }
  }
}
