import Gameboard from "../src/Gameboard.js";
import Player from "../src/Player.js";

describe("Player", () => {
  test("contains its own gameboard", () => {
    const player = new Player("real");

    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("real player attacks given coordinate", () => {
    const player = new Player("real");
    const enemyBoard = new Gameboard();

    enemyBoard.placeShip(1, [2, 2], "horizontal");

    const result = player.attack(enemyBoard, [2, 2]);

    expect(result.hit).toBe(true);
  });

  test("computer player makes legal random attacks without repeating used cells", () => {
    const computer = new Player("computer", 3);
    const enemyBoard = new Gameboard(3);

    const first = computer.attack(enemyBoard);
    const second = computer.attack(enemyBoard);

    expect(first.repeated).toBe(false);
    expect(second.repeated).toBe(false);
    expect(enemyBoard.receivedAttacks.size).toBe(2);
  });
});
