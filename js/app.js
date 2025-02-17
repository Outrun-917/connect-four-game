const $gameMenu = document.querySelector(".game-menu");
const $gameScreen = document.querySelector(".game-screen");
const $gameScreenButtons = document.querySelectorAll(".game-screen__button");
const $gameScreenCurrentTurn = document.querySelector(
  ".game-screen__current-turn"
);
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

const $playerWon = document.querySelector(".player-won");
const $winningPlayer = document.querySelector(".winning-player");
const $playAgainButton = document.querySelector(".play-again-button");

const stop = $inGameMenuButtons[2];
const pause = $gameScreenButtons[0];
const go = $inGameMenuButtons[0];
const start = [
  $gameMenuButtons[0],
  $inGameMenuButtons[1],
  $gameScreenButtons[1],
];

const redCounterImage = `<img src="./assets/counter-red-large.svg" alt="" />`;
const yellowCounterImage = `<img src="./assets/counter-yellow-large.svg" alt="" />`;

let starterState = 0;
let currentPlayer = "r";
let gameBoard = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

let playerOneWin = 0;
let playerTwoWin = 0;

let timer;
let sec = 30;

console.log(gameBoard);

// Menu buttons
$gameMenuButtons.forEach(function ($gameMenuButton) {
  $gameMenuButton.addEventListener("click", function () {
    if (this === $gameMenuButtons[0]) {
      $gameMenu.classList.add("hidden");
      $gameScreen.classList.remove("hidden");
      $backgroundColorTurnIndicator.classList.add("game-on");
      currentPlayer = "r";
      starterState = 0;
      $gameScreenCurrentTurn.classList.remove("hidden");
      $playerWon.classList.add("hidden");
      $gameScreenCurrentTurn.classList.remove("yellow-turn");
      $gameScreenCurrentTurn.classList.add("red-turn");

      playerOneWin = 0;
      playerTwoWin = 0;

      $gameScreenPlayerWinsCounts[0].innerHTML = "0";
      $gameScreenPlayerWinsCounts[1].innerHTML = "0";
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
    } else {
      $backgroundColorTurnIndicator.classList.remove("red-win");
      $backgroundColorTurnIndicator.classList.remove("yellow-win");
      $gameScreenCurrentTurn.classList.add("red-turn");
      $gameScreenCurrentTurn.classList.remove("yellow-turn");
      $playerWon.classList.add("hidden");
      $gameScreenCurrentTurn.classList.remove("hidden");

      gameReset();
      currentPlayer = "r";
      starterState = 0;

      playerOneWin = 0;
      playerTwoWin = 0;

      $gameScreenPlayerWinsCounts[0].innerHTML = "0";
      $gameScreenPlayerWinsCounts[1].innerHTML = "0";
    }
  });
});

// In game menu buttons
$inGameMenuButtons.forEach(function ($inGameMenuButton) {
  $inGameMenuButton.addEventListener("click", function () {
    if (this === $inGameMenuButtons[0]) {
      $inGameMenu.classList.add("hidden");
    } else if (this === $inGameMenuButtons[1]) {
      gameReset();
      $inGameMenu.classList.add("hidden");
      $backgroundColorTurnIndicator.classList.remove("red-win", "yellow-win");

      $playerWon.classList.add("hidden");
      $gameScreenCurrentTurn.classList.remove("hidden");

      currentPlayer = "r";
      starterState = 0;

      playerOneWin = 0;
      playerTwoWin = 0;

      $gameScreenPlayerWinsCounts[0].innerHTML = "0";
      $gameScreenPlayerWinsCounts[1].innerHTML = "0";
    } else {
      gameReset();
      $gameScreen.classList.add("hidden");
      $backgroundColorTurnIndicator.classList.remove(
        "game-on",
        "red-win",
        "yellow-win"
      );
      $inGameMenu.classList.add("hidden");
      $gameMenu.classList.remove("hidden");

      $playerWon.classList.add("hidden");
      $gameScreenCurrentTurn.classList.remove("hidden");

      currentPlayer = "r";
      starterState = 0;
    }
  });
});

// Turn timer
function turnTimer(pause) {
  if (timer && pause) {
    clearInterval(timer);
  } else {
    timer = setInterval(function () {
      $gameScreenCurrentTurnTime.innerHTML = sec + "s";
      console.log(sec);
      sec--;
      if (sec < 0) {
        clearInterval(timer);
        $inGameMenu.classList.remove("hidden");
        console.log("C'est fini");
      }
    }, 1000);
  }
}

stop.addEventListener("click", function () {
  turnTimer(true);
  clearInterval(timer);
  sec = 30;
  $gameScreenCurrentTurnTime.innerHTML = "30s";
});

pause.addEventListener("click", function () {
  turnTimer(true);
});

go.addEventListener("click", function () {
  if ($gameScreenCurrentTurnTime.innerHTML === "0s") {
    sec = 30;
    clearInterval(timer);
    turnTimer(false);
  } else {
    turnTimer(false);
  }
});

start.forEach(function (e) {
  e.addEventListener("click", function () {
    sec = 30;
    clearInterval(timer);
    turnTimer(false);
  });
});

// Play again button
$playAgainButton.addEventListener("click", function () {
  if (starterState === 0) {
    sec = 30;
    clearInterval(timer);
    turnTimer(false);

    $backgroundColorTurnIndicator.classList.remove("red-win");
    $backgroundColorTurnIndicator.classList.remove("yellow-win");
    $gameScreenCurrentTurn.classList.remove("red-turn");
    $gameScreenCurrentTurn.classList.add("yellow-turn");

    gameReset();
    currentPlayer = "y";
    starterState = 1;
  } else {
    sec = 30;
    clearInterval(timer);
    turnTimer(false);

    $backgroundColorTurnIndicator.classList.remove("red-win");
    $backgroundColorTurnIndicator.classList.remove("yellow-win");
    $gameScreenCurrentTurn.classList.add("red-turn");
    $gameScreenCurrentTurn.classList.remove("yellow-turn");

    gameReset();
    currentPlayer = "r";
    starterState = 0;
  }
  $playerWon.classList.add("hidden");
  $gameScreenCurrentTurn.classList.remove("hidden");
});

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

        $playerWon.classList.remove("hidden");
        $winningPlayer.innerHTML = "PLAYER 1";

        playerOneWin++;
        $gameScreenPlayerWinsCounts[0].innerHTML = playerOneWin;

        turnTimer(true);
        return;
      }
      if (checkTie(gameBoard)) {
        console.log(`Egalité, personne n'a gagné !`);

        $playerWon.classList.remove("hidden");
        $winningPlayer.innerHTML = "NO ONE";

        turnTimer(true);
        return;
      }
      sec = 30;
      clearInterval(timer);
      turnTimer(false);
      $gameScreenCurrentTurn.classList.remove("red-turn");
      $gameScreenCurrentTurn.classList.add("yellow-turn");
      $gameScreenCurrentTurnPlayer.innerHTML = `PLAYER 2’S TURN`;
      currentPlayer = "y";
    } else {
      counterDrop(yellowCounterImage);
      if (checkWin(gameBoard)) {
        console.log(`Le joueur ${currentPlayer} a gagné !`);
        $backgroundColorTurnIndicator.classList.add("yellow-win");

        $playerWon.classList.remove("hidden");
        $winningPlayer.innerHTML = "PLAYER 2";

        playerTwoWin++;
        $gameScreenPlayerWinsCounts[1].innerHTML = playerTwoWin;

        turnTimer(true);
        return;
      }
      if (checkTie(gameBoard)) {
        console.log(`Egalité, personne n'a gagné !`);

        $playerWon.classList.remove("hidden");
        $winningPlayer.innerHTML = "NO ONE";

        turnTimer(true);
        return;
      }
      sec = 30;
      clearInterval(timer);
      turnTimer(false);
      $gameScreenCurrentTurn.classList.add("red-turn");
      $gameScreenCurrentTurn.classList.remove("yellow-turn");
      $gameScreenCurrentTurnPlayer.innerHTML = `PLAYER 1’S TURN`;
      currentPlayer = "r";
      console.log(gameBoard);
    }
  });
});
