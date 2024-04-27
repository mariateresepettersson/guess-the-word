//Target the players guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});