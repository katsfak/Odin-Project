import Gameboard from "../src/Gameboard.js";

describe("Gameboard", () => {
  test("places ship at valid coordinates", () => {
    const board = new Gameboard();

    const ship = board.placeShip(3, [0, 0], "horizontal");

    expect(ship.length).toBe(3);
    expect(board.ships).toHaveLength(1);
    expect(board.getCellState([0, 0])).toBe("ship");
    expect(board.getCellState([2, 0])).toBe("ship");
  });

  test("does not allow overlap placement", () => {
    const board = new Gameboard();

    board.placeShip(3, [0, 0], "horizontal");

    expect(() => board.placeShip(2, [1, 0], "vertical")).toThrow();
  });

  test("records hit and miss attacks", () => {
    const board = new Gameboard();

    board.placeShip(2, [1, 1], "horizontal");

    const hitResult = board.receiveAttack([1, 1]);
    const missResult = board.receiveAttack([5, 5]);

    expect(hitResult.hit).toBe(true);
    expect(hitResult.repeated).toBe(false);
    expect(missResult.miss).toBe(true);
    expect(board.missedAttacks).toContainEqual([5, 5]);
  });

  test("flags repeated attacks", () => {
    const board = new Gameboard();

    board.receiveAttack([0, 0]);
    const repeated = board.receiveAttack([0, 0]);

    expect(repeated.repeated).toBe(true);
  });

  test("reports when all ships are sunk", () => {
    const board = new Gameboard();

    board.placeShip(2, [0, 0], "horizontal");
    board.placeShip(1, [3, 3], "horizontal");

    board.receiveAttack([0, 0]);
    board.receiveAttack([1, 0]);
    board.receiveAttack([3, 3]);

    expect(board.allShipsSunk()).toBe(true);
  });
});
