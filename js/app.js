// Victor si tu copie tu verras.

const $gameCells = document.querySelectorAll(".game-cell");

const playerOne = `<img src="./assets/counter-red-large.svg" alt="" />`;
const playerTwo = `<img src="./assets/counter-yellow-large.svg" alt="" />`;

let currentPlayer = "r";
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
  $gameCell.classList.remove("filled");
});

// event listener for gameCell click event
$gameCells.forEach(function ($gameCell) {
  $gameCell.addEventListener("click", function () {
    const dataX = $gameCell.getAttribute("data-x");

    function counterDrop(playerCounter) {
      for (let i = 5; i >= 0; i--) {
        if (gameBoard[i][dataX] === "") {
          console.log("C'est vide");
          gameBoard[i][dataX] = currentPlayer;

          document.querySelector(
            `.game-cell[data-y="${i}"][data-x="${dataX}"]`
          ).innerHTML = playerCounter;

          document.querySelector(
            `.game-cell[data-y="${i}"][data-x="${dataX}"]`
          ).classList.add("filled");

          break;
        } else {
          console.log("C'est pas vide");
        }
      }
    }

    // gameBoard[dataY][dataX] = currentPlayer;

    if (currentPlayer === "r") {
      counterDrop(playerOne)
      currentPlayer = "y";

      console.log(currentPlayer);
      console.log(gameBoard);
    } else {
      counterDrop(playerTwo)
      currentPlayer = "r";
      console.log(currentPlayer);
      console.log(gameBoard);
    }
  });
});
