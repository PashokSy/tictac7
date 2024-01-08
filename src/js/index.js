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

function init() {
  renderBoard();

  board.addEventListener('click', (event) => {
    // player missed a square
    if (Object.keys(event.target.dataset).length === 0) return;
    // square not 'active'
    if (!event.target.classList.contains('active')) return;
    // square is taken
    if (event.target.dataset.occupied === 'true') return;
    // if not taken mark as taken
    else event.target.dataset.occupied = 'true';

    const row = Number(event.target.dataset.row);
    const column = Number(event.target.dataset.column);

    playerMove(row, column);
    togglePlayer();

    activateFields(row, column);

    renderBoard();
  });
}
init();
