let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesleft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    guessesleft -= 1;

    if(guessesleft === 0) {
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    }
    else {
      guessInput.style.borderColor = 'red';
      setMessage(`${guess} is not correct, ${guessesleft} guesses left`, 'red');
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  //Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Num
function getRandomNum(min, max) {
  return Math.ceil(Math.random()*(max-min));
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}