"use strict";

let randomWord = (function() {
  let words = ['apple', 'banana', 'orange', 'pear'];

  return function() {
    let idx = Math.floor(Math.random() * words.length);
    return words.splice(idx, 1)[0];
  };
})();

class Game {
  constructor() {
    this.chosenWord = randomWord();
    this.remainingGuesses = 6;
    this.guessedLetters = [];
  }

  playerWon() {
    return [].every.call(this.chosenWord, (letter) =>
      this.guessedLetters.includes(letter)
    );
  }

  guessesLeft() {
    return this.remainingGuesses;
  }

  lettersGuessed() {
    return this.guessedLetters;
  }

  chosenWordLength() {
    return this.chosenWord.length;
  }

  messages() {
    return {
      outOfWords: "Sorry, I've run out of words!",
      outOfGuesses: "You lose!",
      guessedWord: "You win!",
    };
  }

  letterIndices(letter) {
    return [].map.call(this.chosenWord, (char, idx) => {
      return letter === char ? idx : undefined;
    }).filter((num) => num !== undefined);
  }

  letterAtIdx(idx) {
    return this.chosenWord[idx];
  }

  validCharacterGuess(char) {
    return char.match(/[a-z]/) && !this.lettersGuessed().includes(char);
  }

  processGuess(letter) {
    this.guessedLetters.push(letter);

    if (this.chosenWord.includes(letter)) {
      return true;
    } else {
      this.remainingGuesses -= 1;
      return false;
    }
  }
}

let game;
let $msgArea = $('#message');
let $blanksArea = $('#spaces');
let $guessesArea = $('#guesses');

function updateBlanks(char) {
  let $blanksSpans = $blanksArea.find('span');
  let indices = game.letterIndices(char);
  indices.forEach((idx) => $blanksSpans.eq(idx).text(game.letterAtIdx(idx)));
}

function updateGuesses(char) {
  $guessesArea.append(`<span>${char}</span>`);
}

function resetGame() {
  game = new Game();

  $('#replay').hide();
  $('body').removeClass();
  $(document).bind('keydown', keyDownEvent);
  $('#apples').removeClass();

  $msgArea.text('');
  $blanksArea.find('span').remove();
  $guessesArea.find('span').remove();

  let numBlanks = game.chosenWordLength();
  for (let idx = 0; idx < numBlanks; idx += 1) {
    $blanksArea.append('<span/ >');
  }
}

function showPlayAgain() {
  $('#replay').show();
}

function triggerGameLost() {
  $(document).unbind('keydown');
  $msgArea.text(game.messages().outOfGuesses);
  $('body').toggleClass('lose');
  showPlayAgain();
}

function triggerGameWon() {
  $(document).unbind('keydown');
  $msgArea.text(game.messages().guessedWord);
  $('body').toggleClass('win');
  showPlayAgain();
}

function updateGameState() {
  if (game.guessesLeft() <= 0) {
    triggerGameLost();
  } else if (game.playerWon()) {
    triggerGameWon();
  }
}

function updateApples() {
  let thisGuessNum = 6 - game.guessesLeft();
  if (thisGuessNum) {
    $('#apples').removeClass().addClass(`guess_${thisGuessNum}`);
  }
}

function keyDownEvent(event) {
  event.preventDefault();

  let key = event.key.toLowerCase();

  if (game.validCharacterGuess(key)) {
    if (game.processGuess(key)) {
      updateBlanks(key);
    } else {
      updateApples();
    }
    updateGuesses(key);
    updateGameState();
  }
}

$('#replay').on('click', function(event) {
  event.preventDefault();
  resetGame();
});

$(resetGame);