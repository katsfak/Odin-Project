import GameController from "./gameController.js";

const createBoardElement = (title) => {
  const wrapper = document.createElement("section");
  wrapper.className = "board-wrapper";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const grid = document.createElement("div");
  grid.className = "board-grid";

  wrapper.append(heading, grid);

  return { wrapper, grid };
};

const renderBoard = (gridElement, gameboard, options = {}) => {
  const {
    hideShips = false,
    interactive = false,
    onCellClick = null,
  } = options;

  gridElement.innerHTML = "";

  for (let y = 0; y < gameboard.size; y += 1) {
    for (let x = 0; x < gameboard.size; x += 1) {
      const coordinate = [x, y];
      const state = gameboard.getCellState(coordinate, { hideShips });

      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = `cell ${state}`;
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      cell.setAttribute("aria-label", `Cell ${x}, ${y}`);

      if (interactive && state !== "hit" && state !== "miss") {
        cell.addEventListener("click", () => onCellClick?.(coordinate));
      } else {
        cell.disabled = true;
      }

      gridElement.appendChild(cell);
    }
  }
};

const formatStatus = (controller) => {
  if (controller.gameOver) {
    return controller.winner === "real" ? "You win!" : "Computer wins!";
  }

  return controller.currentTurn === "real" ? "Your turn." : "Computer turn...";
};

export const initGame = (rootSelector = "#app") => {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error(`Root element not found for selector: ${rootSelector}`);
  }

  const controller = new GameController();

  root.innerHTML = `
    <main class="game">
      <h1>Battleship</h1>
      <div class="controls">
        <button id="new-preset" type="button">New Preset Game</button>
        <button id="new-random" type="button">Randomize Ships</button>
      </div>
      <p id="status"></p>
      <div id="boards" class="boards"></div>
    </main>
  `;

  const boardsContainer = root.querySelector("#boards");
  const statusElement = root.querySelector("#status");
  const presetButton = root.querySelector("#new-preset");
  const randomButton = root.querySelector("#new-random");

  const playerBoard = createBoardElement("Your Board");
  const computerBoard = createBoardElement("Computer Board");

  boardsContainer.append(playerBoard.wrapper, computerBoard.wrapper);

  const render = () => {
    statusElement.textContent = formatStatus(controller);

    renderBoard(playerBoard.grid, controller.player.gameboard, {
      hideShips: false,
      interactive: false,
    });

    renderBoard(computerBoard.grid, controller.computer.gameboard, {
      hideShips: true,
      interactive: controller.currentTurn === "real" && !controller.gameOver,
      onCellClick: (coordinate) => {
        const playerTurnResult = controller.playerAttack(coordinate);
        if (!playerTurnResult.ok) {
          statusElement.textContent = playerTurnResult.reason;
          return;
        }

        render();

        if (!controller.gameOver && controller.currentTurn === "computer") {
          setTimeout(() => {
            controller.computerAttack();
            render();
          }, 350);
        }
      },
    });
  };

  presetButton.addEventListener("click", () => {
    controller.setupPresetGame();
    render();
  });

  randomButton.addEventListener("click", () => {
    controller.setupRandomizedPlayerGame();
    render();
  });

  render();
};
