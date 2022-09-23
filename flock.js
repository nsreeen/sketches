
let birds = [];

let boardSize = 400;

// Separation
//     Avoid crowding neighbours (short range repulsion)
// Alignment
//     Steer towards average heading of neighbours
// Cohesion
//     Steer towards average position of neighbours (long range attraction)


function setup() {
  createCanvas(boardSize, boardSize);
  for (var i=0; i<20; i++) {
    let x = Math.floor(Math.random()*(boardSize));
    let y = Math.floor(Math.random()*(boardSize));
    var num = Math.floor(Math.random()*100) + 1;
    num *= Math.round(Math.random()) ? 1 : -1;
    let vector = createVector(num,num,1);
    birds.push([x,y,vector]);
  }
}

function draw() {
  background(220);
  noStroke();

  align();

  separate();

  for (var i=0; i<birds.length; i++) {
    birds[i][0] += (birds[i][2].x * 1.5);
    birds[i][1] += (birds[i][2].y * 1.5);
    circle(birds[i][0], birds[i][1], 10);
  }
}

function separate() {
  birds = birds.sort();
  for (var i=1; i<birds.length; i++) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(birds[i-1][2], birds[i][2]);
      if (diff.x < 10 && diff.y < 10) {
        diff.normalize();
        birds[i][2] = birds[i][2].add(diff);
      }

    }
}

function align() {
  let sum = createVector(0,0);
  let count = 0;
  for (var i=0; i<birds.length; i++) {
    sum = sum.add(birds[i][2]);
    count += 1;
  }

  let average = sum.div(count);
  console.log(average);

  for (var i=0; i<birds.length; i++) {
    birds[i][2] = birds[i][2].add(average).normalize();
  }
}
