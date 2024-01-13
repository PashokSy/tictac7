import '../sass/main.scss';

const board = document.querySelector('.game__board');

let currentPlayer = 'x';
const gameArr = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function renderBoard() {
  for (let row = 0; row < 7; row++) {
    for (let column = 0; column < 7; column++) {
      if (gameArr[row][column] === 1) {
        const square = document.querySelector(
          `[data-row="${row}"][data-column="${column}"]`
        );
        square.classList.add('active');
      }
      if (gameArr[row][column] === 2) {
        const square = document.querySelector(
          `[data-row="${row}"][data-column="${column}"]`
        );
        square.style.backgroundColor = 'red';
      }
      if (gameArr[row][column] === 3) {
        const square = document.querySelector(
          `[data-row="${row}"][data-column="${column}"]`
        );
        square.style.backgroundColor = 'blue';
      }
    }
  }
}

function updateCellValue(square) {
  return square === 0 ? 1 : square;
}

function activateFields(row, column) {
  const upperRow = row - 1 < 0 ? row : row - 1;
  const lowerRow = row + 1 > 6 ? row : row + 1;
  const leftColumn = column - 1 < 0 ? column : column - 1;
  const rightColumn = column + 1 > 6 ? column : column + 1;

  gameArr[upperRow][leftColumn] = updateCellValue(
    gameArr[upperRow][leftColumn]
  );
  gameArr[upperRow][column] = updateCellValue(gameArr[upperRow][column]);
  gameArr[upperRow][rightColumn] = updateCellValue(
    gameArr[upperRow][rightColumn]
  );
  gameArr[row][leftColumn] = updateCellValue(gameArr[row][leftColumn]);
  gameArr[row][rightColumn] = updateCellValue(gameArr[row][rightColumn]);
  gameArr[lowerRow][leftColumn] = updateCellValue(
    gameArr[lowerRow][leftColumn]
  );
  gameArr[lowerRow][column] = updateCellValue(gameArr[lowerRow][column]);
  gameArr[lowerRow][rightColumn] = updateCellValue(
    gameArr[lowerRow][rightColumn]
  );
}

function playerMove(row, column) {
  if (currentPlayer === 'x') gameArr[row][column] = 2;
  if (currentPlayer === 'o') gameArr[row][column] = 3;
}

function togglePlayer() {
  if (currentPlayer === 'x') currentPlayer = 'o';
  else currentPlayer = 'x';
}

function winCheck(boardArr) {
  let winArrRows = [];
  let winArrColumns = [];

  // rows
  for (let row = 0; row < 7; row++) {
    for (let column = 0; column < 7; column++) {
      if (boardArr[row][column] === 0 || boardArr[row][column] === 1) {
        winArrRows = [];
        continue;
      }
      if (boardArr[row][column] === 2) {
        if (winArrRows.length === 0 || winArrRows[0].player === 'X') {
          winArrRows.push({ player: 'X', row, column });
        } else winArrRows = [];
        if (winArrRows.length === 5) {
          return { win: true, boardArr: winArrRows };
        }
      }
      if (boardArr[row][column] === 3) {
        if (winArrRows.length === 0 || winArrRows[0].player === 'O') {
          winArrRows.push({ player: 'O', row, column });
        } else winArrRows = [];
        if (winArrRows.length === 5) {
          return { win: true, boardArr: winArrRows };
        }
      }
    }
  }

  // columns
  for (let column = 0; column < 7; column++) {
    for (let row = 0; row < 7; row++) {
      if (boardArr[row][column] === 0 || boardArr[row][column] === 1) {
        winArrColumns = [];
        continue;
      }
      if (boardArr[row][column] === 2) {
        if (winArrColumns.length === 0 || winArrColumns[0].player === 'X') {
          winArrColumns.push({ player: 'X', row, column });
        } else winArrColumns = [];
        if (winArrColumns.length === 5) {
          return { win: true, boardArr: winArrRows };
        }
      }
      if (boardArr[row][column] === 3) {
        if (winArrColumns.length === 0 || winArrColumns[0].player === 'O') {
          winArrColumns.push({ player: 'O', row, column });
        } else winArrColumns = [];
        if (winArrColumns.length === 5) {
          return { win: true, boardArr: winArrRows };
        }
      }
    }
  }

  // diagonals

  // win condition not fulfilled
  return { win: false, boardArr };
}

function drawCheck() {
  let copyArrX = [];
  let copyArrO = [];

  // copy a board
  for (let row = 0; row < 7; row++) {
    copyArrX[row] = gameArr[row].slice();
    copyArrO[row] = gameArr[row].slice();
  }

  // fill with one of the player and check a win condition
  for (let row = 0; row < 7; row++) {
    for (let column = 0; column < 7; column++) {
      // player X
      if (gameArr[row][column] === 0 || gameArr[row][column] === 1) {
        copyArrX[row][column] = 2;
        copyArrO[row][column] = 3;
      }
    }
  }

  const gameStateX = winCheck(copyArrX);
  const gameStateO = winCheck(copyArrO);

  if (gameStateX.win) return false;
  else if (gameStateO.win) return false;
  else return true;
}

function gameLogic(event) {
  // player missed a square
  if (Object.keys(event.target.dataset).length === 0) return;
  // square not 'active'
  if (!event.target.classList.contains('active')) return;
  // square is taken
  if (event.target.dataset.occupied === 'true') return;
  // mark as taken
  else event.target.dataset.occupied = 'true';

  const row = Number(event.target.dataset.row);
  const column = Number(event.target.dataset.column);

  // one of the player did a move
  playerMove(row, column);
  togglePlayer();

  // activate surrounding fields
  activateFields(row, column);

  // check if one of the players wins
  const gameState = winCheck(gameArr);
  if (gameState.win) {
    let winLine = '';
    gameState.boardArr.forEach((move) => {
      winLine += `row: ${move.row}; column: ${move.column}\n`;
    });
    alert(`Player ${gameState.boardArr[0].player} wins!\n${winLine}`);
  }

  // check if draw
  const draw = drawCheck();
  if (draw) alert('DRAW!');

  // render new board after move
  renderBoard();

  // testing
  console.log(gameArr);
}

function init() {
  renderBoard();

  board.addEventListener('click', gameLogic);
}
init();
