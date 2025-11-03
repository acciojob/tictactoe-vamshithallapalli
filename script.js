const submitBtn = document.getElementById('submit');
    const inputSection = document.getElementById('input-section');
    const gameSection = document.getElementById('game-section');
    const boardDiv = document.getElementById('board');
    const messageDiv = document.querySelector('.message');

    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let currentSymbol = 'X';
    let board = Array(9).fill(null);

    // Winning combinations
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    // Create cells
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = i + 1;
      cell.addEventListener('click', () => handleMove(i, cell));
      boardDiv.appendChild(cell);
    }

    submitBtn.addEventListener('click', () => {
      const p1 = document.getElementById('player1').value.trim();
      const p2 = document.getElementById('player2').value.trim();

      if (!p1 || !p2) {
        alert('Please enter names for both players!');
        return;
      }

      player1 = p1;
      player2 = p2;
      currentPlayer = player1;
      currentSymbol = 'X';

      inputSection.style.display = 'none';
      gameSection.style.display = 'block';
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    });

    function handleMove(index, cell) {
      if (board[index] !== null) return; // Already filled

      board[index] = currentSymbol;
      cell.textContent = currentSymbol;

      if (checkWin()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        disableBoard();
        return;
      }

      if (board.every(c => c !== null)) {
        messageDiv.textContent = `It's a draw!`;
        return;
      }

      // Switch turn
      if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = 'O';
      } else {
        currentPlayer = player1;
        currentSymbol = 'X';
      }
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    }

    function checkWin() {
      return winningCombos.some(combo =>
        combo.every(i => board[i] === currentSymbol)
      );
    }

    function disableBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(c => c.style.pointerEvents = 'none');
    }