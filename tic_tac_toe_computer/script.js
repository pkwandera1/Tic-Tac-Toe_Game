document.addEventListener("DOMContentLoaded", function() {
  const gameBoard = document.querySelector('.gameBoard');
  const buttons = gameBoard.querySelectorAll('button');
  const playResult = document.getElementById('result');
  const resetButton = document.getElementById('reset');
  
  let currentPlayer = 'X';
  let gameEnded = false;

  // Initialize the game board
  let board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
  ];

  // Function to check if the game is over
  function checkGameOver() {
      // Check rows, columns, and diagonals for a winner
      for (let i = 0; i < 3; i++) {
          if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
              return board[i][0]; // Return the winning player
          }
          if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
              return board[0][i]; // Return the winning player
          }
      }
      if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
          return board[0][0]; // Return the winning player
      }
      if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
          return board[0][2]; // Return the winning player
      }
      // Check for a draw
      if (board.flat().every(cell => cell !== '')) {
          return 'draw';
      }
      return null; // Game is not over yet
  }

  // Function to handle the click event on each cell
  function handleCellClick(event) {
      const button = event.target;
      const row = parseInt(button.dataset.row);
      const col = parseInt(button.dataset.col);
      if (board[row][col] === '' && !gameEnded) {
          board[row][col] = currentPlayer;
          button.textContent = currentPlayer;
          const winner = checkGameOver();
          if (winner) {
              if (winner === 'draw') {
                  playResult.textContent = "It's a draw!";
              } else {
                  playResult.textContent = `Player ${winner} wins!`;
              }
              gameEnded = true;
          } else {
              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
              if (currentPlayer === 'O' && !gameEnded) {
                  computerMove();
              }
          }
      }
  }

  // Function for the computer move
  function computerMove() {
      // Simple computer AI: randomly choose an empty cell
      const emptyCells = [];
      buttons.forEach((button, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          if (board[row][col] === '') {
              emptyCells.push(button);
          }
      });
      const randomEmptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const row = parseInt(randomEmptyCell.dataset.row);
      const col = parseInt(randomEmptyCell.dataset.col);
      board[row][col] = currentPlayer;
      randomEmptyCell.textContent = currentPlayer;
      const winner = checkGameOver();
      if (winner) {
          if (winner === 'draw') {
              playResult.textContent = "It's a draw!";
          } else {
              playResult.textContent = `Player ${winner} wins!`;
          }
          gameEnded = true;
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
  }

  // Add event listeners to each cell
  buttons.forEach((button, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      button.dataset.row = row;
      button.dataset.col = col;
      button.addEventListener('click', handleCellClick);
  });

  // Function to reset the game
  function resetGame() {
      board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
      ];
      buttons.forEach(button => {
          button.textContent = '';
      });
      playResult.textContent = '';
      gameEnded = false;
      currentPlayer = 'X';
  }

  // Add event listener to reset button
  resetButton.addEventListener('click', resetGame);
});

const dropdown = document.getElementById('dropdown');

// Add event listener for change event
dropdown.addEventListener('change', function() {
    // Get the selected value
    const selectedValue = dropdown.value;
    // Redirect to the selected URL
    window.location.href = selectedValue;
});