// Global variables to track game state
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = []; // Array to store outcome of each round

// Function to validate player name and initialize the game
function startGame() {
    let nameInput = document.getElementById("playerName").value.trim();

    // Check if input is empty
    if (nameInput === "") {
        alert("Please enter your name.");
        return; // Stop the function here
    }

    // Allow game to start and display welcome message & timestamp
    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, <strong>" + nameInput + "</strong>!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// Function to randomly generate computer's move
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3); // Generates 0, 1, or 2
    return choices[randomIndex];
}

// Function to execute a single round of the game
function playRound(playerChoice) {
    // Prevent playing if Start Game hasn't been clicked
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let roundResult = "";
    let resultElement = document.getElementById("result");

    // Update images based on choices
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    // Determine the winner using if...else logic
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultElement.style.color = "grey";
        resultElement.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultElement.style.color = "green";
        resultElement.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
    } else {
        roundResult = "Lose";
        losses++;
        resultElement.style.color = "red";
        resultElement.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in the array
    results.push(roundResult);

    // Add a new row to the history table
    let roundNumber = results.length;
    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML += 
        "<tr>" +
            "<td>" + roundNumber + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Function to calculate and display win statistics using a for loop
function showSummary() {
    if (results.length === 0) {
        alert("Play at least one round first!");
        return;
    }

    let winCount = 0;

    // Loop through the results array to count wins
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    // Calculate rounded win percentage
    let percentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summaryText").innerHTML = 
        "<strong>Summary:</strong> You played " + results.length + " rounds and won " + percentage + "%.";
}

// Function to reset all scores, history, and display elements
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "Game reset. Choose Rock, Paper, or Scissors!";
    document.getElementById("result").style.color = "#1f2937";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("playerImg").src = "";
    document.getElementById("computerImg").src = "";
}