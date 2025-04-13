const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let currentPlayer = 'X'; // Player 1 is X, Player 2 is O
let gameOver = false;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent !== '' || gameOver) return;

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        statusText.textContent = `${currentPlayer === 'X' ? 'Player 1' : 'Player 2'} Wins! 🎉`;
        gameOver = true;
        return;
    }
    if (isDraw()) {
        statusText.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }

    // Switch players if the game isn't over
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer === 'X' ? 'Player 1' : 'Player 2'}'s Turn (${currentPlayer})`;
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].textContent === player);
    });
}

function isDraw() {
    return cells.every(cell => cell.textContent !== ''); // Check if all cells are filled
}

createBoard();

const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', restartGame);

function restartGame() {
    board.innerHTML = '';
    cells = [];
    currentPlayer = 'X'; // Player 1 starts first
    gameOver = false;
    statusText.textContent = "Player 1's Turn (X)";
    createBoard();
}
