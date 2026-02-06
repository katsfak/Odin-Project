function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  let choice = prompt("Enter your choice (rock, paper, scissors):");
  choice = choice.toLowerCase();
  while (!["rock", "paper", "scissors"].includes(choice)) {
    choice = prompt("Invalid choice. Please enter rock, paper, or scissors:");
    choice = choice.toLowerCase();
  }
  return choice;
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  humanChoice = getHumanChoice();
  computerChoice = getComputerChoice();
  if (humanChoice === computerChoice) {
    alert(`It's a tie! You both chose ${humanChoice}.`);
    alert(`Current score: You: ${humanScore} - Computer: ${computerScore}`);
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    alert(`You win! ${humanChoice} beats ${computerChoice}.`);
    alert(`Current score: You: ${humanScore} - Computer: ${computerScore}`);
  } else {
    computerScore++;
    alert(`You lose! ${computerChoice} beats ${humanChoice}.`);
    alert(`Current score: You: ${humanScore} - Computer: ${computerScore}`);
  }
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    playRound();
  }
  //declare a winner at the end of 5 rounds
  if (humanScore > computerScore) {
    alert(
      `Congratulations! You win the game! Final score: You: ${humanScore} - Computer: ${computerScore}`,
    );
  } else if (humanScore < computerScore) {
    alert(
      `Sorry, you lose the game. Final score: You: ${humanScore} - Computer: ${computerScore}`,
    );
  } else {
    alert(
      `It's a tie! Final score: You: ${humanScore} - Computer: ${computerScore}`,
    );
  }
}

playGame();
