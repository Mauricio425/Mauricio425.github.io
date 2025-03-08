// Get elements
const choices = document.querySelectorAll(".choices img");
const computerImg = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");
const winCount = document.getElementById("wins");
const lossCount = document.getElementById("losses");
const tieCount = document.getElementById("ties");
const resetBtn = document.getElementById("reset");

let wins = 0, losses = 0, ties = 0;
const options = ["rock.PNG", "paper.PNG", "scissors.PNG"]; // Update to match actual file names

// Function to highlight selected choice
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        choices.forEach(img => img.classList.remove("selected"));
        choice.classList.add("selected");
        playGame(choice.id);
    });
});

// Function to animate computer choice
function playGame(playerChoice) {
    let count = 0;
    const shuffleInterval = setInterval(() => {
        computerImg.src = `images/${options[count % 3]}`;
        count++;
    }, 500);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        let computerChoice = options[Math.floor(Math.random() * 3)];
        computerImg.src = `images/${computerChoice}`;
        determineWinner(playerChoice, computerChoice.split(".")[0]); // Remove extension for comparison
    }, 3000);
}

// Function to determine winner
function determineWinner(player, computer) {
    if (player === computer) {
        resultText.innerText = "It's a Tie!";
        ties++;
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        resultText.innerText = "You Win!";
        wins++;
    } else {
        resultText.innerText = "You Lose!";
        losses++;
    }
    updateScore();
}

// Function to update score
function updateScore() {
    winCount.innerText = wins;
    lossCount.innerText = losses;
    tieCount.innerText = ties;
}

// Function to reset the score
resetBtn.addEventListener("click", () => {
    wins = 0;
    losses = 0;
    ties = 0;
    updateScore();
    resultText.innerText = "Choose your move!";
    computerImg.src = "images/question-mark.PNG";
});
