let gameArea = document.getElementById("gameArea");
let guessInput = document.getElementById("guess");
let hint = document.getElementById("hint");
let attemptsText = document.getElementById("attempts");
let nameInput = document.getElementById("nameInput");
let randomNumber, attempts;


function game(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    window.location = "game.html?name=" + encodeURIComponent(name);
    greet(name);
    startGame();
}

function greet(name) {
    alert("Hi " + name + "! Guess the correct number between 1 - 50.");
}

function generateRandomNumber() {
    return Math.floor(Math.random() * (50)) + 1;
}

function checkGuess() {
    let guess = parseInt(guessInput.value);
    attempts++;
    while (true) {
        if (guess < parseInt(randomNumber * 0.25)) {
            alert("Too low! Try again.");
        } else if (guess < randomNumber) {
            alert("Still low but close! Try again.");
        } else if (guess > parseInt(randomNumber * 1.5)) {
            alert("Too high! Try again.");
        } else if (guess > randomNumber) {
            alert("Still high but close! Try again.");
        } else {
            alert("Correct! You guessed the number in " + attempts + " attempts.");
            return true;
        }
    }
}

function startGame() {

    nameInput.value = "";
    gameArea.style.display = "block";
    document.querySelector("button").disabled = true;

    randomNumber = generateRandomNumber();
    attempts = 0;
    attemptsText.textContent = "Attempts: " + attempts;

    while (checkGuess() != true) { }

    var playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        attemptsText.textContent = "Attempts: " + attempts;
        gameArea.style.display = "none";
        document.querySelector("button").disabled = false;
        guessInput.value = "";
        hint.textContent = "";
        attemptsText.textContent = "";
        startGame();
    } else {
        alert("Thanks for playing!");
    }
}





