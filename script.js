const simonButtons = document.querySelectorAll('.simon-button');
const startButton = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const pattern = [];
const userPattern = [];
let gameStarted = false;
let score = 0;

// Function to generate a random number between 0 and 3 (representing the buttons)
function getRandomButton() {
  return Math.floor(Math.random() * 4);
}

// Function to show the pattern to the player
function showPattern() {
  const buttonToLight = pattern[score];
  simonButtons[buttonToLight].classList.add('lit');
  setTimeout(() => {
    simonButtons[buttonToLight].classList.remove('lit');
    score++;
    if (score < pattern.length) {
      setTimeout(showPattern, 600);
    } else {
      score = 0;
      userPattern.length = 0;
      gameStarted = true;
      startButton.textContent = "Repeat the Pattern";
    }
  }, 1000);
}

// Function to start the game
function startGame() {
  if (gameStarted) return;
  pattern.push(getRandomButton());
  showPattern();
  startButton.style.display = "none";
  scoreDisplay.textContent = "Score: 0";
  score = 0;
}

// Function to check if the player's pattern matches the generated pattern
function checkPattern(buttonIndex) {
  if (!gameStarted) return;
  userPattern.push(buttonIndex);
  simonButtons[buttonIndex].classList.add('lit');
  setTimeout(() => {
    simonButtons[buttonIndex].classList.remove('lit');
  }, 300);
  
  if (userPattern.join('') === pattern.slice(0, userPattern.length).join('')) {
    if (userPattern.length === pattern.length) {
      setTimeout(() => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        userPattern.length = 0;
        pattern.push(getRandomButton());
        showPattern();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

// Function to end the game
function gameOver() {
  gameStarted = false;
  startButton.style.display = "inline-block";
  startButton.textContent = "Start Game";
  scoreDisplay.textContent = `Game Over! Final Score: ${score}`;
  pattern.length = 0;
}
  
// Add event listeners to buttons
simonButtons.forEach(button => {
  button.addEventListener('click', () => checkPattern(parseInt(button.dataset.button)));
});

startButton.addEventListener('click', startGame);
