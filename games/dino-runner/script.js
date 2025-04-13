const man = document.getElementById('man');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');

let isJumping = false;
let obstacles = [];
let gameRunning = true;
let score = 0;
let jumpCount = 0; // Tracks the number of jumps
const maxJumps = 2; // Allow double jump

// Start the game
function startGame() {
  gameRunning = true;
  score = 0;
  obstacles.forEach(obs => obs.remove());
  obstacles = [];
  gameOverScreen.classList.add('hidden');

  const background = document.getElementById('background');
  background.style.animationPlayState = 'running';

  man.style.animationPlayState = 'running'; // <--- RESUME dino running

  spawnObstacle();
  updateScore();
}

// Make the man jump (with double jump logic)
function jump() {
  if (jumpCount >= maxJumps || !gameRunning) return;

  man.classList.remove('jump'); // Reset animation
  void man.offsetWidth;         // Trigger reflow to restart animation
  man.classList.add('jump');

  jumpCount++;

  setTimeout(() => {
    jumpCount--; // After jump animation ends, allow next jump
  }, 600); // Match jump animation duration
}

// Detect keyboard or mouse
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      jump();
    } else if (e.code === 'Enter' && !gameRunning) {
      restartGame(); // Restart the game when Enter is pressed after game over
    }
  });

game.addEventListener('click', jump);

// Create and move obstacles
function spawnObstacle() {
  if (!gameRunning) return;

  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = '1000px';
  game.appendChild(obstacle);
  obstacles.push(obstacle);

  moveObstacle(obstacle);

  const nextSpawn = Math.random() * 1500 + 1000; // 1s to 2.5s
  setTimeout(spawnObstacle, nextSpawn);
}

function moveObstacle(obstacle) {
  let obstacleInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(obstacleInterval);
      return;
    }

    let obsLeft = parseInt(window.getComputedStyle(obstacle).left);

    if (obsLeft < -60) {
      obstacle.remove();
      obstacles = obstacles.filter(o => o !== obstacle);
      clearInterval(obstacleInterval);
    } else {
      obstacle.style.left = (obsLeft - 7) + 'px';

      // Check collision
      if (detectCollision(man, obstacle)) {
        endGame();
      }
    }
  }, 20);
}

// Detect collision
function detectCollision(player, obstacle) {
  const pRect = player.getBoundingClientRect();
  const oRect = obstacle.getBoundingClientRect();

  return !(
    pRect.top > oRect.bottom ||
    pRect.bottom < oRect.top ||
    pRect.right < oRect.left ||
    pRect.left > oRect.right
  );
}

// Update score continuously
function updateScore() {
  if (!gameRunning) return;
  score++;
  scoreDisplay.textContent = score;

  setTimeout(updateScore, 100);
}

// Game Over
function endGame() {
  gameRunning = false;
  finalScore.innerHTML = `Your Score: ${score}`;
  gameOverScreen.classList.remove('hidden');

  const background = document.getElementById('background');
  background.style.animationPlayState = 'paused';

  man.style.animationPlayState = 'paused'; // <--- PAUSE dino running
}

// Restart Game
function restartGame() {
  startGame();
}

// Start first time
startGame();
