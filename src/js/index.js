import '../sass/main.scss';

const board = document.querySelector('.game__board');

const gameArr = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

board.addEventListener('click', (event) => {
  console.log(event.target.dataset);

  gameArr[event.target.dataset.row][event.target.dataset.column] = 1;

  console.log(gameArr);

  const element = document.querySelector(
    `[data-row="${event.target.dataset.row}"][data-column="${event.target.dataset.column}"]`
  );
  element.style.backgroundColor = 'red';
});
