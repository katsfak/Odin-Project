import Gameboard from "./Gameboard.js";

export default class Player {
  constructor(type = "real", boardSize = 10) {
    if (type !== "real" && type !== "computer") {
      throw new Error('Player type must be either "real" or "computer".');
    }

    this.type = type;
    this.gameboard = new Gameboard(boardSize);
  }

  get isComputer() {
    return this.type === "computer";
  }

  getRandomLegalAttack(enemyGameboard) {
    const legalCoordinates = [];

    for (let x = 0; x < enemyGameboard.size; x += 1) {
      for (let y = 0; y < enemyGameboard.size; y += 1) {
        const coordinate = [x, y];
        if (!enemyGameboard.hasBeenAttacked(coordinate)) {
          legalCoordinates.push(coordinate);
        }
      }
    }

    if (legalCoordinates.length === 0) {
      throw new Error("No legal attacks are available.");
    }

    const randomIndex = Math.floor(Math.random() * legalCoordinates.length);
    return legalCoordinates[randomIndex];
  }

  attack(enemyGameboard, coordinate) {
    let target = coordinate;

    if (this.isComputer && !target) {
      target = this.getRandomLegalAttack(enemyGameboard);
    }

    if (!Array.isArray(target)) {
      throw new Error("Attack coordinate must be provided.");
    }

    return enemyGameboard.receiveAttack(target);
  }
}
