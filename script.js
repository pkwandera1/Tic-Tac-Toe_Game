const marker = document.querySelectorAll('.gameBoard > button');
const playResult = document.getElementById('result');
const resetButton = document.getElementById('reset');
const buttons = document.querySelectorAll('button');

function createGameBoard() {
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  function displayGrid() {
    console.log("Current Grid:");
    console.table(board);
  }

  function finalDisplay() {
    console.log("Final Grid:");
    console.table(board);
  }

  return {
    board,
    displayGrid,
    finalDisplay
  };
}

function createTicTacToeGame() {
  let currentPlayer = 'X';
  const gameBoard = createGameBoard();
  let gameEnded = false;

  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWinner() {
    const { board } = gameBoard;
    for (let i = 0; i < 3; i++) {
      if ((board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') ||
        (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '')) {
        return true;
      }
    }
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') ||
      (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '')) {
      return true;
    }
    return false;
  }

  function isGridFull() {
    const { board } = gameBoard;
    return board.every(row => row.every(cell => cell !== ''));
  }

  function getValue() {
    const { board, displayGrid, finalDisplay } = gameBoard;

    marker.forEach((button, index) => {
      button.addEventListener('click', () => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        if (board[row][col] === '') {
          board[row][col] = currentPlayer;
          button.innerHTML = `<h1>${currentPlayer}</h1>`;
          displayGrid();
          if (checkWinner()) {
            playResult.innerHTML = `Player ${currentPlayer} wins!`;
            console.log(`Player ${currentPlayer} wins!`);
            finalDisplay();
            endGame();
          } else if (isGridFull()) {
            playResult.innerHTML = "It's a draw!";
            console.log("It's a draw!");
            finalDisplay();
          } else {
            switchPlayer();
          }
        } else {
          playResult.innerHTML = "This cell is already occupied! Please choose another cell.";
        }
      });
    });
  }

  return {
    getValue
  };
}

function endGame() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
} 
// Call the function to start the game
createTicTacToeGame().getValue();

resetButton.addEventListener('click', () => {
  window.location.reload();
});

const dropdown = document.getElementById('dropdown');

// Add event listener for change event
dropdown.addEventListener('change', function() {
    // Get the selected value
    const selectedValue = dropdown.value;
    // Redirect to the selected URL
    window.location.href = selectedValue;
});