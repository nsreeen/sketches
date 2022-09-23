let board = [];
let boardSize = 200;
let row = 0;

function setup() {
  createCanvas(600, 600);
  for (var i=0; i<boardSize; i++) {
    board.push(0);
  }
  // leave first and last 0
  board[boardSize/2] = 1
  board[boardSize/6] = 1
  board[3 * boardSize/4] = 1
}


function draw() {

  // background(220);

  for (var i=0; i<board.length; i++) { // [0,1,0, ..]
    //map(value, start1, stop1, start2, stop2,
    let x = map(i, 0, boardSize, 0, width);
    let y = map(row, 0, boardSize, 0, height);

    stroke(0);
    fill(board[i] == 1 ? 0 : 255);

    rect(x, y, width/boardSize, height/boardSize);
  }

  board = update(board);
  row ++;
}

function update(board) {
  let newBoard = [];
  newBoard.push(0);
  for (let i=1; i<board.length-1; i++) {
    let sum = board[i-1] + board[i+1];
    // let cell = (board[i] == 1 && board[i-1] == 1) ? 1 : 0
    // newBoard.push(cell);
    newBoard.push(sum % 2);
  }
  newBoard.push(0);
  return newBoard;
}
