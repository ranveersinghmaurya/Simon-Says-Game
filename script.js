
/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

// Select all four colored buttons
let buttons = document.querySelectorAll(".game-button");

// Select heading and status
let gameTitle = document.querySelector("#game-title");

let gameStatus = document.querySelector("#game-status");

// Select Start Game button
let startButton = document.querySelector("#start-button");

// Select How to Play button
let howToPlayButton = document.querySelector("#how-to-play-button");

// Select tutorial links container
let tutorialLinks = document.querySelector("#tutorial-links");



/* =========================================
   2. GAME VARIABLES
========================================= */

// Computer's sequence
let gameSequence = [];

// User's sequence
let userSequence = [];

// Available colors
let colors = ["green", "red", "yellow", "blue"];

// Current level
let level = 0;

// Game state
let gameStarted = false;

// Computer is showing sequence or not
let isShowingSequence = false;



/* =========================================
   3. START BUTTON EVENT
========================================= */

startButton.addEventListener("click", function () {

    // Start game only if it is not running
    if (gameStarted === false) {

        startGame();

    }

});



/* =========================================
   4. HOW TO PLAY BUTTON EVENT
========================================= */

howToPlayButton.addEventListener("click", function () {

    // Check whether tutorial links are visible
    if (tutorialLinks.style.display === "flex") {

        // Hide tutorial links
        tutorialLinks.style.display = "none";

    } else {

        // Show tutorial links vertically
        tutorialLinks.style.display = "flex";

    }

});



/* =========================================
   5. START GAME FUNCTION
========================================= */

function startGame() {

    // Reset previous game data
    gameSequence = [];

    userSequence = [];

    level = 0;

    // Update game state
    gameStarted = true;

    isShowingSequence = false;

    // Hide Start Game button
    startButton.style.display = "none";

    // Reset heading
    gameTitle.innerText = "Simon Says Game";

    // Start first level
    nextLevel();

}



/* =========================================
   6. NEXT LEVEL FUNCTION
========================================= */

function nextLevel() {

    // Increase level
    level++;

    // Update heading
    gameStatus.innerText = "Level " + level;

    // Reset user sequence
    userSequence = [];

    // Generate random index
    let randomIndex = Math.floor(Math.random() * 4);

    // Get random color
    let randomColor = colors[randomIndex];

    // Add random color to computer sequence
    gameSequence.push(randomColor);

    // Show computer sequence
    showSequence();

}



/* =========================================
   7. DELAY FUNCTION
========================================= */

function delay(time) {

    return new Promise(function (resolve) {

        setTimeout(resolve, time);

    });

}



/* =========================================
   8. FLASH BUTTON FUNCTION
========================================= */

async function flashButton(color) {

    // Select particular button
    let button = document.querySelector("#" + color);

    // Add flash class
    button.classList.add("flash");

    // Wait for 400 milliseconds
    await delay(400);

    // Remove flash class
    button.classList.remove("flash");

}



/* =========================================
   9. SHOW COMPUTER SEQUENCE
========================================= */

async function showSequence() {

    // Lock user input
    isShowingSequence = true;

    // Small delay before flashing
    await delay(500);

    // Get only the newly added color
    let newColor = gameSequence[gameSequence.length - 1];

    // Flash only the new button
    await flashButton(newColor);

    // Allow user to play
    isShowingSequence = false;

}



/* =========================================
   10. CHECK USER ANSWER
========================================= */

function checkAnswer(color) {

    // Ignore clicks if game is not running
    if (gameStarted === false) return;

    // Ignore clicks while computer is showing sequence
    if (isShowingSequence === true) return;

    // Store clicked color
    userSequence.push(color);

    // Current user click index
    let currentIndex = userSequence.length - 1;

    // Compare user answer with computer sequence
    if (userSequence[currentIndex] !== gameSequence[currentIndex]) {

        // Wrong answer
        gameOver();

        return;

    }

    // Check whether user completed the full sequence
    if (userSequence.length === gameSequence.length) {

        // Lock input during level transition
        isShowingSequence = true;

        // Move to next level
        setTimeout(function () {

            nextLevel();

        }, 700);

    }

}



/* =========================================
   11. BUTTON CLICK EVENTS
========================================= */

for (let button of buttons) {

    button.addEventListener("click", function () {

        // Get button color using ID
        let color = button.getAttribute("id");

        // Ignore clicks when game is inactive
        if (gameStarted === false) return;

        // Ignore clicks while sequence is playing
        if (isShowingSequence === true) return;

        // Flash the clicked button
        flashButton(color);

        // Check user's answer
        checkAnswer(color);

    });

}



/* =========================================
   12. GAME OVER FUNCTION
========================================= */

function gameOver() {

    // Stop the game
    gameStarted = false;

    isShowingSequence = false;

    // Update heading
    gameTitle.innerText = "Game Over!";

    // Display final level
    gameStatus.innerText = "You reached Level " + level;

    // Change button text
    startButton.innerText = "Play Again";

    // Show restart button
    startButton.style.display = "block";

}
