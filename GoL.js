let liveCells = new Array("50,51","50,52","50,53","51,50","51,51","51,52", "80,82", "81,80", "81,82", "82,81", "82,82");

let boardSize = 500;

let mouseClicks = new Array();


async function setup() {
  createCanvas(boardSize, boardSize);

  for (var i = 0; i < 50; i++) {
      liveCells = liveCells.concat(mouseClicks);
      liveCells = liveCells.filter((item, position) => position == liveCells.indexOf(item));
      mouseClicks = new Array();

      liveCells = updateCells(liveCells);

      await asleep(1000);
  }
}

function draw() {
    let x = mouseX;
    let y = mouseY;
    let mouseClick = `${x/5},${y/5}`;
    mouseClicks.push(mouseClick);

    drawCircles()
}

function drawCircles() {
  background(128,128,128);
  noStroke();
  for (var i = 0; i < liveCells.length; i++) {
      let coords = liveCells[i].split(",");
      let x = map(parseInt(coords[0]), 0, 100, 0, boardSize);
      let y = map(parseInt(coords[1]), 0, 100, 0, boardSize);
      circle(x, y, 5)
  }
}

function updateCells(liveCells) {
    let map = new Map();
    for (var i = 0; i < liveCells.length; i++) {
        let neighbors = getNeighbors(liveCells[i], liveCells);
        for (var j = 0; j < neighbors.length; j++) {
            if (map.has(neighbors[j])) {
                map.set(neighbors[j], (map.get(neighbors[j])+1));
            } else {
                map.set(neighbors[j], 1);
            }
        }
    }
    let newLiveCells = [...map.entries()].filter(([key, value]) => value == 3)
    let keysOfNewLiveCells = newLiveCells.map(([key, value]) => key);
    return keysOfNewLiveCells;
}

function isOnBoard(cell) {
    let coords = cell.split(",");
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);
    return x > 0 && x < boardSize && y > 0 && y < boardSize;

}

function getNeighbors(cell) {
  let coords = cell.split(",");
  let x = parseInt(coords[0]);
  let y = parseInt(coords[1]);
  let neighbors = [`${x-1},${y-1}`, `${x-1},${y}`, `${x-1},${y+1}`, `${x},${y-1}`, `${x},${y}`, `${x},${y+1}`, `${x+1},${y-1}`, `${x+1},${y}`, `${x+1},${y+1}`];
  return neighbors.filter(cell => isOnBoard(cell));
}

function getLiveNeighbors(cell, liveCells) {
  let neighbors = getNeighbors(cell);
  let liveNieghbors = neighbors.filter(n => liveCells.includes(n));
  return liveNieghbors
}



function asleep(n) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, n);
  });
}
