//Target the players guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
//Target guess button
const guessButton = document.querySelector(".guess");
//Target the text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
//Target the empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//Target the paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
//Target empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//Target the hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again hide");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n");
  //console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

// Start the game
getWord();

// Display the symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  const goodGuess = validatePlayerInput(guess);

  if (goodGuess) {
    //Guess the letter when we have a letter
    makeGuess(guess);
  }
  letterInput.value = "";
});

//Declare function that checks player's input
const validatePlayerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    //If empty then return message
    message.innerText = "Please enter a letter.";
  } else if (input.lenth > 1) {
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText =
      "Invalid input. Please enter a valid letter (A-Z, a-z).";
  } else {
    return input;
  }
};

//Declare a function to capture input
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You have already guessed that letter. Try again.";
  } else {
    guessedLetters.push(guess);
    //console.log(guessedLetters);
    remainingGuessesCount(guess);
    displayGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

//Declare a function to show the guessed letters
const displayGuessedLetters = function () {
  //Clear the list
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

//Declare a function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toLocaleUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

//Declare a function to count remaining guesses
const remainingGuessesCount = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

//Delcare a funcrion to check if the player won
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};
