const $gameCells = document.querySelectorAll(".game-cell");

const playerOne = `<img src="./assets/counter-red-large.svg" alt="" />`;
const playerTwo = `<img src="./assets/counter-yellow-large.svg" alt="" />`;

let currentPlayer = "1";
let gameBoard = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

console.log(gameBoard);

$gameCells.forEach(function ($gameCell) {
  $gameCell.innerHTML = "";
});

$gameCells.forEach(function ($gameCell) {
  $gameCell.addEventListener("click", function () {
    const dataX = $gameCell.getAttribute("data-x");
    const dataY = $gameCell.getAttribute("data-y");

    // gameBoard[dataY][dataX] = currentPlayer;

    if ($gameCell.hasChildNodes() === false) {
      if (currentPlayer === "1") {
        $gameCell.innerHTML = playerOne;
        currentPlayer = "2";

        //   console.log(gameBoard);
      } else {
        $gameCell.innerHTML = playerTwo;
        currentPlayer = "1";

        //   console.log(gameBoard);
      }
    }
  });
});
