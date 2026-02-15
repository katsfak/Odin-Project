const Player = (name, symbol) => {
  return { name, symbol };
};

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const setCell = (index, symbol) => {
    if (board[index] === "") {
      board[index] = symbol;
      return true;
    }
    return false;
  };
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setCell, reset };
})();

const Game = (() => {
  let player1 = Player("Player 1", "X");
  let player2 = Player("Player 2", "O");
  let currentPlayer = player1;
  let gameOver = false;
  let winner = null;
  let isComputerMode = false;
  let difficulty = "hard";

  // All possible winning combinations
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  const checkWinner = () => {
    const board = Gameboard.getBoard();

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { symbol: board[a], combination }; // Returns winning symbol and positions
      }
    }
    return null;
  };

  const checkTie = () => {
    const board = Gameboard.getBoard();
    return board.every((cell) => cell !== "");
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;
  const isComputerTurn = () => isComputerMode && currentPlayer === player2;

  const playTurn = (index) => {
    if (gameOver) {
      return { success: false, message: "Game is over!" };
    }

    if (Gameboard.setCell(index, currentPlayer.symbol)) {
      // Check for winner
      const winResult = checkWinner();
      if (winResult) {
        gameOver = true;
        winner = currentPlayer;
        return {
          success: true,
          gameOver: true,
          winner: currentPlayer,
          winningCombination: winResult.combination,
        };
      }

      // Check for tie
      if (checkTie()) {
        gameOver = true;
        return { success: true, gameOver: true, tie: true };
      }

      // Switch to next player
      switchPlayer();
      return { success: true, gameOver: false };
    } else {
      return { success: false, message: "Cell already taken!" };
    }
  };

  const isGameOver = () => gameOver;
  const getWinner = () => winner;

  const setPlayers = (name1, name2, vsComputer, diff) => {
    player1 = Player(name1 || "Player 1", "X");
    player2 = Player(vsComputer ? "Computer" : name2 || "Player 2", "O");
    currentPlayer = player1;
    isComputerMode = vsComputer;
    difficulty = diff || "hard";
  };

  const resetGame = () => {
    currentPlayer = player1;
    gameOver = false;
    winner = null;
    Gameboard.reset();
  };

  const getDifficulty = () => difficulty;

  return {
    switchPlayer,
    getCurrentPlayer,
    resetGame,
    playTurn,
    isGameOver,
    getWinner,
    checkWinner,
    checkTie,
    setPlayers,
    isComputerTurn,
    getDifficulty,
  };
})();

// AI Module - Computer logic with minimax algorithm
const ComputerAI = (() => {
  // Minimax algorithm for unbeatable AI
  const minimax = (board, depth, isMaximizing) => {
    const winner = evaluateBoard(board);

    // Terminal states
    if (winner === "O") return 10 - depth; // Computer wins
    if (winner === "X") return depth - 10; // Player wins
    if (board.every((cell) => cell !== "")) return 0; // Tie

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const evaluateBoard = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const getEmptyCells = (board) => {
    return board
      .map((cell, index) => (cell === "" ? index : null))
      .filter((val) => val !== null);
  };

  const getBestMove = (difficulty) => {
    const board = [...Gameboard.getBoard()];
    const emptyCells = getEmptyCells(board);

    if (emptyCells.length === 0) return null;

    if (difficulty === "easy") {
      // Easy: Random move most of the time, occasional smart move
      if (Math.random() < 0.8) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
    } else if (difficulty === "medium") {
      // Medium: Mix of random and smart moves
      if (Math.random() < 0.5) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
    }

    // Hard: Use minimax for optimal move
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = "";

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  return { getBestMove };
})();

// DisplayController - handles all DOM manipulation
const DisplayController = (() => {
  const setupSection = document.getElementById("setup-section");
  const gameSection = document.getElementById("game-section");
  const startGameBtn = document.getElementById("start-game-btn");
  const restartBtn = document.getElementById("restart-btn");
  const player1Input = document.getElementById("player1-name");
  const player2Input = document.getElementById("player2-name");
  const player2InputGroup = document.getElementById("player2-input-group");
  const turnDisplay = document.getElementById("turn-display");
  const resultDisplay = document.getElementById("result-display");
  const cells = document.querySelectorAll(".cell");

  // Game mode elements
  const modePvPBtn = document.getElementById("mode-pvp");
  const modePvCBtn = document.getElementById("mode-pvc");
  const difficultySection = document.getElementById("difficulty-section");
  const difficultySelect = document.getElementById("difficulty-select");

  let currentMode = "pvp"; // Default mode

  const init = () => {
    startGameBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", restartGame);

    // Game mode selection
    modePvPBtn.addEventListener("click", () => selectMode("pvp"));
    modePvCBtn.addEventListener("click", () => selectMode("pvc"));

    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  };

  const selectMode = (mode) => {
    currentMode = mode;

    // Update button states
    if (mode === "pvp") {
      modePvPBtn.classList.add("active");
      modePvCBtn.classList.remove("active");
      player2InputGroup.classList.remove("hidden");
      difficultySection.classList.add("hidden");
      player2Input.placeholder = "Enter name";
    } else {
      modePvCBtn.classList.add("active");
      modePvPBtn.classList.remove("active");
      player2InputGroup.classList.add("hidden");
      difficultySection.classList.remove("hidden");
    }
  };

  const startGame = () => {
    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();
    const isVsComputer = currentMode === "pvc";
    const difficulty = difficultySelect.value;

    Game.setPlayers(player1Name, player2Name, isVsComputer, difficulty);
    Game.resetGame();

    setupSection.classList.add("hidden");
    gameSection.classList.remove("hidden");

    updateDisplay();
    renderBoard();
  };

  const restartGame = () => {
    Game.resetGame();
    resultDisplay.classList.add("hidden");
    renderBoard();
    updateDisplay();
  };

  const handleCellClick = (e) => {
    // Prevent clicks during computer's turn
    if (Game.isComputerTurn()) return;

    const index = parseInt(e.target.dataset.index);
    const result = Game.playTurn(index);

    if (result.success) {
      renderBoard();

      if (result.gameOver) {
        if (result.winner) {
          showWinner(result.winner, result.winningCombination);
        } else if (result.tie) {
          showTie();
        }
      } else {
        updateDisplay();

        // Computer's turn
        if (Game.isComputerTurn()) {
          makeComputerMove();
        }
      }
    }
  };

  const makeComputerMove = () => {
    // Disable board temporarily
    cells.forEach((cell) => (cell.style.pointerEvents = "none"));

    // Add thinking delay for better UX
    setTimeout(() => {
      const difficulty = Game.getDifficulty();
      const move = ComputerAI.getBestMove(difficulty);

      if (move !== null) {
        const result = Game.playTurn(move);

        if (result.success) {
          renderBoard();

          if (result.gameOver) {
            if (result.winner) {
              showWinner(result.winner, result.winningCombination);
            } else if (result.tie) {
              showTie();
            }
          } else {
            updateDisplay();
          }
        }
      }

      // Re-enable board
      cells.forEach((cell) => (cell.style.pointerEvents = "auto"));
    }, 500); // 500ms delay
  };

  const renderBoard = () => {
    const board = Gameboard.getBoard();

    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.classList.remove("taken", "x", "o", "winning");

      if (board[index]) {
        cell.classList.add("taken");
        cell.classList.add(board[index].toLowerCase());
      }
    });
  };

  const updateDisplay = () => {
    const currentPlayer = Game.getCurrentPlayer();
    turnDisplay.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
  };

  const showWinner = (winner, winningCombination) => {
    resultDisplay.textContent = `🎉 ${winner.name} wins!`;
    resultDisplay.classList.remove("hidden", "tie");
    resultDisplay.classList.add("winner");

    // Highlight winning cells
    winningCombination.forEach((index) => {
      cells[index].classList.add("winning");
    });

    turnDisplay.textContent = "Game Over!";
  };

  const showTie = () => {
    resultDisplay.textContent = "It's a tie! 🤝";
    resultDisplay.classList.remove("hidden", "winner");
    resultDisplay.classList.add("tie");
    turnDisplay.textContent = "Game Over!";
  };

  return { init };
})();

// Initialize the game when DOM is loaded
DisplayController.init();
