let state = "F";
let len = 5;
let pattern = "FF+[F--F--F]-[F++F++F]";
iterations = 0;

function setup() {
  createCanvas(500,500);

  let input = createInput("custom");
  input.input(updatePattern)
  let button1 = createButton("reset");
  button1.mousePressed(reset);

  let button2 = createButton("FF[F+++F+++][F---F---]");
  button2.mousePressed(snowflakes);

  let button3 = createButton("FF+[F--F--F]-[F++F++F]");
  button3.mousePressed(swirls);

  let button4 = createButton("FF[++F+F+][++F-F-]");
  button4.mousePressed(twigs);

  background(220);
  translate(width/2,height);
}

function twigs() {
  console.log("snowflakes");
  pattern = "FF[++F+F+][++F-F-]";
  state = "F";
  iterations = 0;
}

function swirls() {
  console.log("snowflakes");
  pattern = "FF+[F--F--F]-[F++F++F]";
  state = "F";
  iterations = 0;
}

function snowflakes() {
  console.log("snowflakes");
  pattern = "FF[F+++F+++][F---F---]";
  state = "F";
  iterations = 0;
}

function mouseClicked() {
  console.log("click");

  if (iterations < 6) {
    state = Array.from(state);
    for (var i=0; i<state.length; i++) {
      if (state[i] == "F") {
        state[i] = pattern;
      }
    }
    state = state.join("");
  }
  iterations += 1;

  push();
  background(220);

  console.log(state);
  for (var i=0; i<state.length; i++) {
    let currentChar = state.charAt(i);
    if (currentChar == "F") {
      line(0,0,0,-len);
      translate(0,-len);
    } else if (currentChar == "+") {
      rotate(60);
    } else if (currentChar == "-") {
      rotate(-60);
    } else if (currentChar == "[") {
      push();
    } else if (currentChar == "]") {
      pop();
    } else { // "G" -> no line
      translate(0,-len);
    }
  }
  pop();
}

function reset() {
  console.log("reset");
  state = "F";
  iterations = 0;
}

function updatePattern() {
  console.log("updatePattern");
  pattern = this.value();
}
