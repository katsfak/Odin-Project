const BOARD_SIZE = 8;

const KNIGHT_OFFSETS = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

const isInsideBoard = ([x, y]) =>
  x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

const keyFromSquare = ([x, y]) => `${x},${y}`;

const squareFromKey = (key) => key.split(",").map(Number);

const getNeighbors = ([x, y]) => {
  const neighbors = [];

  for (const [dx, dy] of KNIGHT_OFFSETS) {
    const nextSquare = [x + dx, y + dy];
    if (isInsideBoard(nextSquare)) {
      neighbors.push(nextSquare);
    }
  }

  return neighbors;
};

const buildPath = (parents, endKey) => {
  const path = [];
  let currentKey = endKey;

  while (currentKey !== null) {
    path.push(squareFromKey(currentKey));
    currentKey = parents.get(currentKey);
  }

  return path.reverse();
};

function knightMoves(start, end) {
  if (!isInsideBoard(start) || !isInsideBoard(end)) {
    throw new Error("Start and end positions must be on an 8x8 board (0-7).");
  }

  const startKey = keyFromSquare(start);
  const endKey = keyFromSquare(end);

  if (startKey === endKey) {
    console.log("You made it in 0 moves! Here's your path:");
    console.log(start);
    return [start];
  }

  const queue = [start];
  const visited = new Set([startKey]);
  const parents = new Map([[startKey, null]]);

  while (queue.length > 0) {
    const current = queue.shift();
    const currentKey = keyFromSquare(current);

    if (currentKey === endKey) {
      const path = buildPath(parents, endKey);
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((square) => console.log(square));
      return path;
    }

    for (const next of getNeighbors(current)) {
      const nextKey = keyFromSquare(next);
      if (!visited.has(nextKey)) {
        visited.add(nextKey);
        parents.set(nextKey, currentKey);
        queue.push(next);
      }
    }
  }

  return [];
}

knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);
