import '../sass/main.scss';

const board = document.querySelector('.game__board');

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
    }
  }
}
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

  gameArr[row][column] = 2;
  debugger;
  if (row - 1 < 0 && column - 1 < 0) {
    gameArr[row][column + 1] = 1;
    gameArr[row + 1][column] = 1;
    gameArr[row + 1][column + 1] = 1;
  } else if (row - 1 < 0) {
    gameArr[row][column - 1] = 1;
    gameArr[row][column + 1] = 1;
    gameArr[row + 1][column - 1] = 1;
    gameArr[row + 1][column] = 1;
    gameArr[row + 1][column + 1] = 1;
  } else if (column + 1 > 7) {
    gameArr[row - 1][column - 1] = 1;
    gameArr[row - 1][column] = 1;
    gameArr[row][column - 1] = 1;
    gameArr[row + 1][column - 1] = 1;
    gameArr[row + 1][column] = 1;
  } else if (column - 1 < 0) {
    gameArr[row - 1][column] = 1;
    gameArr[row - 1][column + 1] = 1;
    gameArr[row][column + 1] = 1;
    gameArr[row + 1][column] = 1;
    gameArr[row + 1][column + 1] = 1;
  } else if (row + 1 > 7) {
    gameArr[row - 1][column - 1] = 1;
    gameArr[row - 1][column] = 1;
    gameArr[row - 1][column + 1] = 1;
    gameArr[row][column - 1] = 1;
    gameArr[row][column + 1] = 1;
  } else {
    gameArr[row - 1][column - 1] = 1;
    gameArr[row - 1][column] = 1;
    gameArr[row - 1][column + 1] = 1;
    gameArr[row][column - 1] = 1;
    gameArr[row][column + 1] = 1;
    gameArr[row + 1][column - 1] = 1;
    gameArr[row + 1][column] = 1;
    gameArr[row + 1][column + 1] = 1;
  }
  //   gameArr[row - 1][column - 1] = 1;
  //   gameArr[row - 1][column] = 1;
  //   gameArr[row - 1][column + 1] = 1;
  //   gameArr[row][column - 1] = 1;
  //   gameArr[row][column + 1] = 1;
  //   gameArr[row + 1][column - 1] = 1;
  //   gameArr[row + 1][column] = 1;
  //   gameArr[row + 1][column + 1] = 1;

  console.log(gameArr);

  renderBoard();
});
