import Ship from "./Ship.js";

const DIRECTIONS = {
  horizontal: [1, 0],
  vertical: [0, 1],
};

const keyFromCoordinate = ([x, y]) => `${x},${y}`;

export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.ships = [];
    this.missedAttacks = [];
    this.receivedAttacks = new Set();
    this.occupiedCoordinates = new Map();
  }

  isValidCoordinate([x, y]) {
    return (
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      x < this.size &&
      y >= 0 &&
      y < this.size
    );
  }

  #coordinatesForShip(length, start, orientation) {
    const direction = DIRECTIONS[orientation];

    if (!direction) {
      throw new Error('Orientation must be either "horizontal" or "vertical".');
    }

    if (!this.isValidCoordinate(start)) {
      throw new Error("Ship start coordinate must be inside the board.");
    }

    const [startX, startY] = start;
    const [dx, dy] = direction;
    const coordinates = [];

    for (let index = 0; index < length; index += 1) {
      const coordinate = [startX + dx * index, startY + dy * index];
      if (!this.isValidCoordinate(coordinate)) {
        throw new Error("Ship coordinates must stay inside the board.");
      }
      coordinates.push(coordinate);
    }

    return coordinates;
  }

  canPlaceShip(length, start, orientation = "horizontal") {
    let coordinates;

    try {
      coordinates = this.#coordinatesForShip(length, start, orientation);
    } catch {
      return false;
    }

    return coordinates.every(
      (coordinate) =>
        !this.occupiedCoordinates.has(keyFromCoordinate(coordinate)),
    );
  }

  placeShip(length, start, orientation = "horizontal") {
    if (!Number.isInteger(length) || length < 1) {
      throw new Error("Ship length must be a positive integer.");
    }

    if (!this.canPlaceShip(length, start, orientation)) {
      throw new Error("Cannot place ship at the requested coordinates.");
    }

    const ship = new Ship(length);
    const coordinates = this.#coordinatesForShip(length, start, orientation);

    coordinates.forEach((coordinate) => {
      this.occupiedCoordinates.set(keyFromCoordinate(coordinate), ship);
    });

    this.ships.push({ ship, coordinates });
    return ship;
  }

  hasBeenAttacked(coordinate) {
    if (!this.isValidCoordinate(coordinate)) {
      return false;
    }

    return this.receivedAttacks.has(keyFromCoordinate(coordinate));
  }

  receiveAttack(coordinate) {
    if (!this.isValidCoordinate(coordinate)) {
      throw new Error("Attack coordinate must be inside the board.");
    }

    const key = keyFromCoordinate(coordinate);

    if (this.receivedAttacks.has(key)) {
      return {
        coordinate,
        hit: false,
        miss: false,
        repeated: true,
        sunk: false,
      };
    }

    this.receivedAttacks.add(key);

    const ship = this.occupiedCoordinates.get(key);

    if (ship) {
      ship.hit();
      return {
        coordinate,
        hit: true,
        miss: false,
        repeated: false,
        sunk: ship.isSunk(),
      };
    }

    this.missedAttacks.push(coordinate);

    return {
      coordinate,
      hit: false,
      miss: true,
      repeated: false,
      sunk: false,
    };
  }

  allShipsSunk() {
    return (
      this.ships.length > 0 && this.ships.every(({ ship }) => ship.isSunk())
    );
  }

  getCellState(coordinate, { hideShips = false } = {}) {
    if (!this.isValidCoordinate(coordinate)) {
      throw new Error("Coordinate must be inside the board.");
    }

    const key = keyFromCoordinate(coordinate);
    const hasShip = this.occupiedCoordinates.has(key);
    const attacked = this.receivedAttacks.has(key);

    if (attacked && hasShip) {
      return "hit";
    }

    if (attacked && !hasShip) {
      return "miss";
    }

    if (hasShip && !hideShips) {
      return "ship";
    }

    return "empty";
  }
}
