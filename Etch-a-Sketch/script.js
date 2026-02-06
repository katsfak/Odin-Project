const container = document.querySelector(".container");
const gridButton = document.querySelector("#grid-button");
const clearButton = document.querySelector("#clear-button");
const GRID_SIZE = 16;
const MAX_GRID_SIZE = 100;

function createGrid(size) {
  container.innerHTML = "";
  container.style.setProperty("--grid-size", size);
  const total = size * size;

  for (let i = 0; i < total; i++) {
    const cell = document.createElement("div");
    cell.classList.add("box");
    container.appendChild(cell);
  }
}

createGrid(GRID_SIZE);

container.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("box")) {
    const cell = event.target;
    const currentDarken = Number(cell.dataset.darken || 0);
    const nextDarken = Math.min(currentDarken + 1, 10);
    const darkenFactor = 1 - nextDarken / 10;

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const darkenedRed = Math.floor(red * darkenFactor);
    const darkenedGreen = Math.floor(green * darkenFactor);
    const darkenedBlue = Math.floor(blue * darkenFactor);

    cell.dataset.darken = String(nextDarken);
    cell.style.backgroundColor = `rgb(${darkenedRed}, ${darkenedGreen}, ${darkenedBlue})`;
  }
});

gridButton.addEventListener("click", () => {
  const input = prompt(`Enter grid size (1-${MAX_GRID_SIZE}):`, GRID_SIZE);
  const size = Number(input);

  if (!Number.isInteger(size) || size < 1 || size > MAX_GRID_SIZE) {
    alert(`Please enter a whole number between 1 and ${MAX_GRID_SIZE}.`);
    return;
  }

  createGrid(size);
});

clearButton.addEventListener("click", () => {
  const cells = container.querySelectorAll(".box");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffff";
    delete cell.dataset.darken;
  });
});
