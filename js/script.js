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

const word = "magnolia";
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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

const validateGuess = function (letterInput) {
    const acceptedLetter = [a - zA - Z];
};

//Declare function that checks player's input
const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //If empty then return message
        message.innerText = "Please enter a letter.";
    } else if (input.lenth > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Invalid input. Please enter a valid letter (A-Z, a-z).";
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
        console.log(guessedLetters);
    }
}
