function Player(sign) {
  this.sign = sign;
  const getSign = () => {
    return sign;
  };
  return { getSign };
}

// When clicking on a tile, set the tile with the player's sign
// Check for win conditions
// If win condition is met, display win message
// If no more valid moves, display draw message
// Otherwise, move gameplay to next player
// Clicking on reset button will reset the game

// gameBoard controls the board and it's values
// displayController displays the game status messages and updates the display of dom elements for the grid
// gameController controls the gameplay, keeps track of scores, checks if there is a winner

const gameBoard = (() => {
  const boardValues = ["", "", "", "", "", "", "", "", ""];
  const setField = (index) => {
    console.log(index);
  };
  const reset = () => {};
  return { setField, reset };
})();

const displayController = (() => {
  const grids = document.querySelectorAll(".grid");
  const messageElement = document.getElementById("gameMessage");
  const restartBtn = document.getElementById("restart-btn");

  const setMessage = (message) => {
    messageElement.innerText = message;
    console.log(`Setting ${message}`);
  };

  const reset = () => {
    grids.forEach((grid) => {
      grid.innerText = "";
    });
  };

  restartBtn.addEventListener("click", () => {
    gameBoard.reset();
    reset();
    setMessage("It's Player X's turn.");
  });

  grids.forEach((grid) => {
    grid.addEventListener("click", (e) => {
      grid.innerText = "X";
      gameBoard.setField(e.target.dataset.index);
    });
  });

  return { setMessage, reset };
})();

const gameController = (function () {
  const player1 = Player("X");
  const player2 = Player("O");
  let round = 1;
  const checkWin = function () {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  };
})();
