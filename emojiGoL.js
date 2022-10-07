let boardScope = 10;
let cells = [];

async function setup() {
  createCanvas(400, 400);
  cells.push(["🥜",5,5,0]);
  cells.push(["🥜",8,3,0]);
  cells.push(["🦠",6,6,0]);
  cells.push(["🦠",5,6,0]);
  cells.push(["🦠",7,7,0]);
  cells.push(["🦠",2,3,0]);
  cells.push(["🦠",2,4,0]);
  cells.push(["🦠",9,3,0]);
  cells.push(["🦠",9,4,0]);
  cells.push(["🦠",8,1,0]);
  cells.push(["🦠",5,7,0]);
  cells.push(["🦠",8,4,0]);
  cells.push(["🍄",2,5,0]);
  cells.push(["🍄",4,5,0]);
  cells.push(["🍄",4,7,0]);
  cells.push(["🍄",9,1,0]);
  cells.push(["🍄",5,8,0]);
  cells.push(["🍄",3,5,0]);

  for (var i=0; i<50; i++) {
    await asleep(1000);
    updateCells(cells);
  }

}

function draw() {
  background(220);
  textSize(30);
  for (var i=0; i<cells.length; i++) {
    let x = map(cells[i][1],0,boardScope,0,width);
    let y = map(cells[i][2],0,boardScope,0,height);
    text(cells[i][0], x, y);
  }
}

function iterate(icon, numNeighbors, lifeTime) {
  // let lookup = new Map([
  //   ["🥜", "🌱"],
  //   ["🌱","🌴"],
  //   ["🌴","🦠"],
  //   ["🦠","🥜"],
  // ]);
  // return lookup.get(icon);
  if (numNeighbors > 3) {
    return ["🍄", 0]
  }
  if (icon == "🥜") {
    return ["🌱", 0]
  } else if (icon == "🌱" && (lifeTime > 5 || numNeighbors > 2)) {
    return ["🌴", 0]
  } else if (icon == "🌴" && numNeighbors > 2) {
    return ["🥜", 0]
  } else if (icon == "🌴") {
    return ["🦠", 0]
  } else if (icon == "🦠" && lifeTime > 4) {
    return ["🥜", 0]
  } else if (icon == "🍄" && lifeTime > 8) {
    return ["🌱", 0]
  } else {
    return [icon, lifeTime+1]
  }
}

function updateCells(cells) {
  console.log("updating cells");
  for (var i=0; i<cells.length; i++) {
    let neighborCoords = getNeighborCoords(cells[i]);
    let numNeighbors = getNumberOfNeighbors(neighborCoords);
    result = iterate(cells[i][0],  numNeighbors, cells[i][3]);
    cells[i][0] = result[0]
    cells[i][3] = result[1]
  }
}

function getNumberOfNeighbors(neighborCoords) {
  //let neighbors = new Map();
  let neighbors = 0;
  for (var i=0; i<cells.length; i++) {
    for (var j=0; j<neighborCoords.length; j++) {
      if (cells[i][1] == neighborCoords[0] && cells[i][2] == neighborCoords[1]) {
        // if (neighbors.has(cells[i][0])) {
        //   neighbors.set(cells[i][0], (neighbors.get(cells[i][0])+1));
        // } else {
        //   neighbors.set(cells[i][0], 1);
        // }
        neighbors = neighbors + 1;
      }
  }
  }
  return neighbors;
}

function getNeighborCoords(cell) {
  let x = cell[1];
  let y = cell[2];
  let neighbors = [[x-1,y-1], [x-1,y], [x-1,y+1], [x,y-1], [x,y], [x,y+1], [x+1,y-1], [x+1,y], [x+1,y+1]];
  return neighbors.filter(cell => (cell[0] >= 0 && cell[0] >= 0 && cell[0] <= boardScope && cell[1] <= boardScope));
}

function asleep(n) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, n);
  });
}
