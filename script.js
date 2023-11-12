function Player(sign) {
  this.sign = sign;
  const getSign = () => {
    return sign;
  };
  return { getSign };
}

// Check for win conditions
// If win condition is met, display win message
// Clicking on reset button will reset the game

// gameBoard controls the board and it's values
// displayController displays the game status messages and updates the display of dom elements for the grid
// gameController controls the gameplay, keeps track of scores, checks if there is a winner

const gameBoard = (() => {
  const boardValues = ["", "", "", "", "", "", "", "", ""];
  const setField = (index, currPlayer) => {
    boardValues[index] = currPlayer;
  };

  const getField = (index) => {
    return boardValues[index];
  };

  const reset = () => {
    boardValues.forEach((value, index) => (boardValues[index] = ""));
  };

  return { setField, getField, reset };
})();

const displayController = (() => {
  const grids = document.querySelectorAll(".grid");
  const messageElement = document.getElementById("gameMessage");
  const restartBtn = document.getElementById("restart-btn");

  const updateGrid = (index, currPlayer) => {
    grids[index].innerText = currPlayer;
  };

  const setMessage = (message) => {
    messageElement.innerText = message;
  };

  // Event listeners for clickable elements
  restartBtn.addEventListener("click", () => {
    gameBoard.reset();
    gameController.reset();
    grids.forEach((grid) => {
      grid.innerText = "";
    });
    setMessage("It's Player X's turn.");
  });

  grids.forEach((grid) => {
    grid.addEventListener("click", (e) => {
      gameController.playRound(parseInt(e.target.dataset.index));
    });
  });

  return { updateGrid, setMessage };
})();

const gameController = (function () {
  const player1 = Player("X");
  const player2 = Player("O");
  let round = 1;

  const playRound = (index) => {
    if (round == 9) return;
    currPlayer = round % 2 !== 0 ? player1.getSign() : player2.getSign();
    gameBoard.setField(index, currPlayer);
    displayController.updateGrid(index, currPlayer);
    evalRound(checkWin(index, currPlayer), currPlayer);
  };

  const evalRound = (outcome, currPlayer) => {
    const message = getMessage(outcome, currPlayer);
    displayController.setMessage(message);
    outcome ? (round = 9) : round++;
  };

  const getMessage = (win, currPlayer) => {
    if (win) return `Game is over! Player ${currPlayer} has won!`;
    if (round == 9) return "Game is over! It's a draw!";
    if (currPlayer == "X") return `It's Player O's turn!`;
    return `It's Player X's turn!`;
  };

  const checkWin = (index, currPlayer) => {
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

    const possibleCombinations = winConditions.filter((condition) =>
      condition.includes(index)
    );
    const winningCondition = possibleCombinations.some((condition) =>
      condition.every(
        (gridIndex) => gameBoard.getField(gridIndex) == currPlayer
      )
    );
    return Boolean(winningCondition);
  };

  const reset = () => {
    round = 1;
  };

  return { playRound, reset };
})();
