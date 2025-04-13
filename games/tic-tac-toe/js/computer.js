const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let currentPlayer = 'X'; // You are X
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
        statusText.textContent = `You Win! 🎉`;
        gameOver = true;
        return;
    }
    if (isDraw()) {
        statusText.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }

    currentPlayer = 'O';
    statusText.textContent = "Computer's Turn (O)";
    setTimeout(computerMove, 500);
}

function computerMove() {
    if (gameOver) return;
    let emptyCells = cells.filter(cell => cell.textContent === '');
    if (emptyCells.length === 0) return;
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusText.textContent = `Computer Wins! 🤖`;
        gameOver = true;
        return;
    }
    if (isDraw()) {
        statusText.textContent = "It's a Draw!";
        gameOver = true;
        return;
    }

    currentPlayer = 'X';
    statusText.textContent = "Your Turn (X)";
}

function checkWin(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].textContent === player);
    });
}

function isDraw() {
    return cells.every(cell => cell.textContent !== '');
}

createBoard();
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', restartGame);

function restartGame() {
    board.innerHTML = '';
    cells = [];
    currentPlayer = 'X';
    gameOver = false;
    statusText.textContent = "Your Turn (X)";
    createBoard();
}
