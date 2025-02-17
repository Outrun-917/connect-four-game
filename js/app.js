const $gameMenu = document.querySelector(".game-menu");
const $gameScreen = document.querySelector(".game-screen");
const $gameScreenButtons = document.querySelectorAll(".game-screen__button");
const $inGameMenu = document.querySelector(".in-game-menu");
const $inGameMenuButtons = document.querySelectorAll(".in-game-menu__button");
const $gameRules = document.querySelector(".game-rules");
const $gameMenuButtons = document.querySelectorAll(".game-menu-button");
const $gameRulesButton = document.querySelector(".game-rules__button");
const $gameScreenBoardCells = document.querySelectorAll(
  ".game-screen-board__cell"
);

const $backgroundColorTurnIndicator = document.querySelector(
  ".background-color-turn-indicator"
);

// Game handlers
const $gameScreenPlayerWinsCounts = document.querySelectorAll(
  ".game-screen__player-wins-count"
);
const $gameScreenCurrentTurnPlayer = document.querySelector(
  ".game-screen__current-turn-player"
);
const $gameScreenCurrentTurnTime = document.querySelector(
  ".game-screen__current-turn-time"
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
      $backgroundColorTurnIndicator.classList.add("game-on");
      turnTimer();
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

// In game buttons
$gameScreenButtons.forEach(function ($gameScreenButton) {
  $gameScreenButton.addEventListener("click", function () {
    if (this === $gameScreenButtons[0]) {
      $inGameMenu.classList.remove("hidden");
      turnTimer(pause)
    } else {
      gameReset();
    }
  });
});

// In game menu buttons
$inGameMenuButtons.forEach(function ($inGameMenuButton) {
  $inGameMenuButton.addEventListener("click", function () {
    if (this === $inGameMenuButtons[0]) {
      $inGameMenu.classList.add("hidden");
      if (($gameScreenCurrentTurnTime.innerHTML === "0s")) {
        turnTimer();
      }
    } else if (this === $inGameMenuButtons[1]) {
      gameReset();
      $inGameMenu.classList.add("hidden");
    } else {
      gameReset();
      $gameScreen.classList.add("hidden");
      $backgroundColorTurnIndicator.classList.remove("game-on");
      $inGameMenu.classList.add("hidden");
      $gameMenu.classList.remove("hidden");
    }
  });
});

function turnTimer(pause) {
  let sec = 30;
  let timer = setInterval(function () {
    $gameScreenCurrentTurnTime.innerHTML = sec + "s";
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      $inGameMenu.classList.remove("hidden");
    }
  }, 1000);
}

// Game reset
function gameReset() {
  gameBoard = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  $gameScreenBoardCells.forEach(function ($gameScreenBoardCell) {
    $gameScreenBoardCell.innerHTML = "";
    $gameScreenBoardCell.classList.remove("filled");
  });

  currentPlayer = "r";

  console.log("Le jeu a été réinitialisé !");
}

// Win verification, game gets scanned at each turn
function checkWin(board) {
  const rows = 6; // Amount of rows
  const cols = 7; // Amount of columns

  // Verify the rows (horizontal)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      // cols -4 to not overflow the grid
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

  // Verify columns (vertical)
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r <= rows - 4; r++) {
      // rows -4 to not overflow the grid
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

  // Verify main diagonals (\)
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

  // Verify secondary diagonals (/)
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

function checkTie(board) {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c] === "") {
        return false;
      }
    }
  }
  return true;
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
      if (checkWin(gameBoard)) {
        console.log(`Le joueur ${currentPlayer} a gagné !`);
        $backgroundColorTurnIndicator.classList.add("red-win");
        return;
      }
      if (checkTie(gameBoard)) {
        console.log(`Egalité, personne n'a gagné !`);
        return;
      }
      currentPlayer = "y";
    } else {
      counterDrop(yellowCounterImage);
      if (checkWin(gameBoard)) {
        console.log(`Le joueur ${currentPlayer} a gagné !`);
        $backgroundColorTurnIndicator.classList.add("yellow-win");
        return;
      }
      if (checkTie(gameBoard)) {
        console.log(`Egalité, personne n'a gagné !`);
        return;
      }
      currentPlayer = "r";
      console.log(gameBoard);
    }
  });
});
