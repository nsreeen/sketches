

let x;
let theta = 0.0;
let dim = 40.0;

function setup() {
  createCanvas(500, 300);
  x = width;
}

function draw() {
  background(51, 255, 233);
  x = x - 1;
  theta = theta + 0.05;
  let y = height/2 + sin(theta) * 5;
  translate(x, y);
  fill(255);
  textSize(30);
  text("🐟", -dim / 2, -dim / 2);
}
