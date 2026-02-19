import Ship from "../src/Ship.js";

describe("Ship", () => {
  test("stores length and starts with zero hits", () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  test("hit increments hits", () => {
    const ship = new Ship(2);

    ship.hit();

    expect(ship.hits).toBe(1);
  });

  test("isSunk is true when hits reach length", () => {
    const ship = new Ship(2);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
