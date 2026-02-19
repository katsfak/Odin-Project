import Player from "./Player.js";

const FLEET_LENGTHS = [5, 4, 3, 3, 2];

const PRESET_PLAYER_PLACEMENTS = [
  { length: 5, start: [0, 0], orientation: "horizontal" },
  { length: 4, start: [2, 2], orientation: "vertical" },
  { length: 3, start: [5, 1], orientation: "horizontal" },
  { length: 3, start: [7, 4], orientation: "vertical" },
  { length: 2, start: [0, 7], orientation: "horizontal" },
];

const PRESET_COMPUTER_PLACEMENTS = [
  { length: 5, start: [1, 0], orientation: "vertical" },
  { length: 4, start: [4, 3], orientation: "horizontal" },
  { length: 3, start: [8, 1], orientation: "vertical" },
  { length: 3, start: [0, 9], orientation: "horizontal" },
  { length: 2, start: [6, 6], orientation: "vertical" },
];

export default class GameController {
  constructor() {
    this.player = new Player("real");
    this.computer = new Player("computer");
    this.currentTurn = "real";
    this.winner = null;
    this.gameOver = false;
    this.setupPresetGame();
  }

  setupPresetGame() {
    this.player = new Player("real");
    this.computer = new Player("computer");
    this.currentTurn = "real";
    this.winner = null;
    this.gameOver = false;

    this.#placeFleetFromPlacements(this.player, PRESET_PLAYER_PLACEMENTS);
    this.#placeFleetFromPlacements(this.computer, PRESET_COMPUTER_PLACEMENTS);
  }

  setupRandomizedPlayerGame() {
    this.player = new Player("real");
    this.computer = new Player("computer");
    this.currentTurn = "real";
    this.winner = null;
    this.gameOver = false;

    this.#placeFleetRandomly(this.player);
    this.#placeFleetRandomly(this.computer);
  }

  #placeFleetFromPlacements(player, placements) {
    placements.forEach(({ length, start, orientation }) => {
      player.gameboard.placeShip(length, start, orientation);
    });
  }

  #placeFleetRandomly(player) {
    FLEET_LENGTHS.forEach((length) => {
      let placed = false;

      while (!placed) {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * player.gameboard.size);
        const y = Math.floor(Math.random() * player.gameboard.size);

        if (player.gameboard.canPlaceShip(length, [x, y], orientation)) {
          player.gameboard.placeShip(length, [x, y], orientation);
          placed = true;
        }
      }
    });
  }

  playerAttack(coordinate) {
    if (this.gameOver) {
      return { ok: false, reason: "Game is over." };
    }

    if (this.currentTurn !== "real") {
      return { ok: false, reason: "It is not the player turn." };
    }

    const result = this.player.attack(this.computer.gameboard, coordinate);

    if (result.repeated) {
      return { ok: false, reason: "Coordinate was already attacked.", result };
    }

    if (this.computer.gameboard.allShipsSunk()) {
      this.gameOver = true;
      this.winner = "real";
      return { ok: true, result, gameOver: true, winner: this.winner };
    }

    this.currentTurn = "computer";
    return { ok: true, result, gameOver: false };
  }

  computerAttack() {
    if (this.gameOver) {
      return { ok: false, reason: "Game is over." };
    }

    if (this.currentTurn !== "computer") {
      return { ok: false, reason: "It is not the computer turn." };
    }

    const result = this.computer.attack(this.player.gameboard);

    if (this.player.gameboard.allShipsSunk()) {
      this.gameOver = true;
      this.winner = "computer";
      return { ok: true, result, gameOver: true, winner: this.winner };
    }

    this.currentTurn = "real";
    return { ok: true, result, gameOver: false };
  }
}
