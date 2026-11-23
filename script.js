
/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

// Select all four colored buttons
let buttons = document.querySelectorAll(".game-button");

// Select heading and status
let gameTitle = document.querySelector("#game-title");

let gameStatus = document.querySelector("#game-status");



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
   3. KEYBOARD EVENT
========================================= */

document.addEventListener("keydown", function () {

    // Start game only if it is not running
    if (gameStarted === false) {

        startGame();

    }

});



/* =========================================
   4. START GAME FUNCTION
========================================= */

function startGame() {

    // Reset previous game data
    gameSequence = [];

    userSequence = [];

    level = 0;

    // Update game state
    gameStarted = true;

    isShowingSequence = false;

    // Reset heading
    gameTitle.innerText = "Simon Says Game";

    // Start first level
    nextLevel();

}



/* =========================================
   5. NEXT LEVEL FUNCTION
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
   6. DELAY FUNCTION
========================================= */

function delay(time) {

    return new Promise(function (resolve) {

        setTimeout(resolve, time);

    });

}



/* =========================================
   7. FLASH BUTTON FUNCTION
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
   8. SHOW COMPUTER SEQUENCE
========================================= */


/* =========================================
   SHOW ONLY THE NEW BUTTON
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
   9. CHECK USER ANSWER
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
   10. BUTTON CLICK EVENTS
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
   11. GAME OVER FUNCTION
========================================= */

function gameOver() {

    // Stop the game
    gameStarted = false;

    isShowingSequence = false;

    // Update heading
    gameTitle.innerText = "Game Over!";

    // Display final level
    gameStatus.innerText =
        "You reached Level " + level +
        " | Press any key to restart";

}
