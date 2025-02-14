const $gameMenu = document.querySelector(".game-menu");
const $gameScreen = document.querySelector(".game-screen");
const $gameRules = document.querySelector(".game-rules");
const $gameMenuButtons = document.querySelectorAll(".game-menu-button");
const $gameRulesButton = document.querySelector(".game-rules__button");
const $gameScreenBoardCells = document.querySelectorAll(
  ".game-screen-board__cell"
);

const $backgroundColorTurnIndicator = document.querySelector(
  ".background-color-turn-indicator"
);

const redCounterImage = `<img src="./assets/counter-red-large.svg" alt="" />`;
const yellowCounterImage = `<img src="./assets/counter-yellow-large.svg" alt="" />`;

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

// Menu buttons
$gameMenuButtons.forEach(function ($gameMenuButton) {
  $gameMenuButton.addEventListener("click", function () {
    if (this === $gameMenuButtons[0]) {
      $gameMenu.classList.add("hidden");
      $gameScreen.classList.remove("hidden");
      document;
      $backgroundColorTurnIndicator.classList.add("game-on");
    } else {
      $gameMenu.classList.add("hidden");
      $gameRules.classList.remove("hidden");
      $backgroundColorTurnIndicator.classList.add("hidden");
    }
  });
});

// Rules button
$gameRulesButton.addEventListener("click", function () {
  $gameRules.classList.add("hidden");
  $gameMenu.classList.remove("hidden");
  $backgroundColorTurnIndicator.classList.remove("hidden");
});

// Vérification de la victoire, à chaque tour, le tableau de jeu est scanné
function checkWin(board) {
  const rows = 6; // Nombre de lignes
  const cols = 7; // Nombre de colonnes

  // Vérifier les lignes (horizontal)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      // cols -4 pour ne pas dépasser la grille
      if (
        board[r][c] !== "" &&
        board[r][c] === board[r][c + 1] &&
        board[r][c] === board[r][c + 2] &&
        board[r][c] === board[r][c + 3]
      ) {
        return true;
      }
    }
  }

  // Vérifier les colonnes (vertical)
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r <= rows - 4; r++) {
      // rows -4 pour ne pas dépasser la grille
      if (
        board[r][c] !== "" &&
        board[r][c] === board[r + 1][c] &&
        board[r][c] === board[r + 2][c] &&
        board[r][c] === board[r + 3][c]
      ) {
        return true;
      }
    }
  }

  // Vérifier les diagonales principales (\)
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      if (
        board[r][c] !== "" &&
        board[r][c] === board[r + 1][c + 1] &&
        board[r][c] === board[r + 2][c + 2] &&
        board[r][c] === board[r + 3][c + 3]
      ) {
        return true;
      }
    }
  }

  // Vérifier les diagonales secondaires (/)
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 3; c < cols; c++) {
      if (
        board[r][c] !== "" &&
        board[r][c] === board[r + 1][c - 1] &&
        board[r][c] === board[r + 2][c - 2] &&
        board[r][c] === board[r + 3][c - 3]
      ) {
        return true;
      }
    }
  }

  return false;
}

$gameScreenBoardCells.forEach(function ($gameScreenBoardCell) {
  $gameScreenBoardCell.innerHTML = "";
  $gameScreenBoardCell.classList.remove("filled");
});

// event listener for gameCell click event
$gameScreenBoardCells.forEach(function ($gameScreenBoardCell) {
  $gameScreenBoardCell.addEventListener("click", function () {
    const dataX = $gameScreenBoardCell.getAttribute("data-x");

    function counterDrop(playerCounter) {
      for (let i = 5; i >= 0; i--) {
        if (gameBoard[i][dataX] === "") {
          console.log("C'est vide");
          gameBoard[i][dataX] = currentPlayer;

          document.querySelector(
            `.game-screen-board__cell[data-y="${i}"][data-x="${dataX}"]`
          ).innerHTML = playerCounter;

          document
            .querySelector(
              `.game-screen-board__cell[data-y="${i}"][data-x="${dataX}"]`
            )
            .classList.add("filled");

          break;
        } else {
          console.log("C'est pas vide");
        }
      }
    }

    if (currentPlayer === "r") {
      counterDrop(redCounterImage);
      const isWin = checkWin(gameBoard);
      if (isWin) {
        console.log(`Le joueur ${currentPlayer} a gagné !`);
        $backgroundColorTurnIndicator.classList.add("red-turn");
        return;
      }
      currentPlayer = "y";
    } else {
      counterDrop(yellowCounterImage);
      const isWin = checkWin(gameBoard);
      if (isWin) {
        console.log(`Le joueur ${currentPlayer} a gagné !`);
        $backgroundColorTurnIndicator.classList.add("yellow-turn");
        return;
      }
      currentPlayer = "r";
      console.log(gameBoard);
    }
  });
});
