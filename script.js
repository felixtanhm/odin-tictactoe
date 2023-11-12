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

  const reset = () => {};
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
      gameController.playRound(parseInt(e.target.dataset.index));
    });
  });

  return { updateGrid, setMessage, reset };
})();

const gameController = (function () {
  const player1 = Player("X");
  const player2 = Player("O");
  let round = 1;

  const playRound = (index) => {
    currPlayer = getCurrentPlayer();
    gameBoard.setField(index, currPlayer);
    displayController.updateGrid(index, currPlayer);
    getMessage(checkWin(index, currPlayer), currPlayer);
    round++;
  };

  const getMessage = (win, currPlayer) => {
    if (win) {
      displayController.setMessage(
        `Game is over! Player ${currPlayer} has won!`
      );
    } else if (round == 9) {
      displayController.setMessage("Game is over! It's a draw!");
    } else if (currPlayer == "X") {
      displayController.setMessage(`It's Player O's turn!`);
    } else displayController.setMessage(`It's Player X's turn!`);
  };

  const getCurrentPlayer = () => {
    return round % 2 !== 0 ? player1.getSign() : player2.getSign();
  };

  const checkWin = function (index, currPlayer) {
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
    return winningCondition;
  };

  return { playRound };
})();
