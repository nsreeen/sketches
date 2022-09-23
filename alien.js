let moveAmount = 10;
let boardSize = 400;
let objects = [];
let img;
let isHome = false;
let fadeIn = 0;

function setup() {
  createCanvas(boardSize, boardSize);
  objects.push(["👾", 200, 200], ["🚀", 100, 300], ["🪐", 300, 100], ["🪐", 50, 150], ["☄️", 150, 50], ["☄️", 300, 300])
  img = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/200px-Mercury_in_color_-_Prockter07-edit1.jpg");
}

function draw() {
  background(220);
  noStroke();

  textSize(20);
  let collision = detectCollision();
  if (collision && objects[collision][0] == "🚀") {
    text("time to go home 🚀🚀🚀", 60,200);
    goHome();
  }
  if (collision && objects[collision][0] == "☄️") {
    text("comet is not your friend", 80,200);
  }
  if (collision && objects[collision][0] == "🪐") {
    text("this isn't home", 100,200);
  }

  textSize(30);
  for (var j=objects.length-1; j>=0; j--) {
    text(objects[j][0], objects[j][1], objects[j][2])
  }

  if (isHome) {
    tint(255, fadeIn);
    image(img, 0, 0, boardSize, boardSize);
    tint(255, 255);
    text(objects[0][0], objects[0][1], objects[0][2]);
    fadeIn = fadeIn < 255 ? fadeIn + 1 : fadeIn;
  }
}

function goHome(n) {
  console.log("gohome")
  return new Promise(resolve => {
    setTimeout(() => {
      isHome = true;
    }, 300);
  });
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
