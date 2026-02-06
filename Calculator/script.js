const display = document.getElementById("display");
const buttons = document.getElementById("buttons");

let firstValue = null;
let operator = null;
let waitingForSecond = false;
let resultDisplayed = false;
let currentInput = "0";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Nice try. Divide by zero?";
  }
  return a / b;
}

function operate(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error";
  }
}

function updateDisplay(value) {
  display.textContent = value;
}

function formatResult(value) {
  if (typeof value === "string") {
    return value;
  }
  if (!Number.isFinite(value)) {
    return "Error";
  }
  const rounded = Math.round(value * 1e8) / 1e8;
  let text = rounded.toString();
  if (text.length > 12) {
    text = Number(rounded).toPrecision(12);
  }
  return text;
}

function inputDigit(digit) {
  if (resultDisplayed && !operator) {
    currentInput = digit;
    resultDisplayed = false;
    updateDisplay(currentInput);
    return;
  }

  if (waitingForSecond) {
    currentInput = digit;
    waitingForSecond = false;
    updateDisplay(currentInput);
    return;
  }

  if (currentInput === "0") {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  updateDisplay(currentInput);
}

function inputDecimal() {
  if (resultDisplayed && !operator) {
    currentInput = "0.";
    resultDisplayed = false;
    updateDisplay(currentInput);
    return;
  }

  if (waitingForSecond) {
    currentInput = "0.";
    waitingForSecond = false;
    updateDisplay(currentInput);
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
}

function handleOperator(nextOperator) {
  if (operator && waitingForSecond) {
    operator = nextOperator;
    return;
  }

  const inputValue = Number(currentInput);

  if (firstValue === null) {
    firstValue = inputValue;
  } else if (operator) {
    const result = operate(operator, firstValue, inputValue);
    const formatted = formatResult(result);
    updateDisplay(formatted);
    if (typeof result === "string") {
      firstValue = null;
      operator = null;
      waitingForSecond = true;
      resultDisplayed = true;
      return;
    }
    firstValue = Number(formatted);
  }

  operator = nextOperator;
  waitingForSecond = true;
  resultDisplayed = false;
}

function handleEquals() {
  if (!operator || waitingForSecond) {
    return;
  }

  const inputValue = Number(currentInput);
  const result = operate(operator, firstValue, inputValue);
  const formatted = formatResult(result);
  updateDisplay(formatted);

  if (typeof result === "string") {
    firstValue = null;
    operator = null;
    waitingForSecond = true;
    resultDisplayed = true;
    return;
  }

  firstValue = Number(formatted);
  operator = null;
  waitingForSecond = false;
  resultDisplayed = true;
  currentInput = formatted;
}

function handleClear() {
  firstValue = null;
  operator = null;
  waitingForSecond = false;
  resultDisplayed = false;
  currentInput = "0";
  updateDisplay(currentInput);
}

function handleBackspace() {
  if (resultDisplayed) {
    return;
  }

  if (waitingForSecond) {
    currentInput = "0";
    waitingForSecond = false;
    updateDisplay(currentInput);
    return;
  }

  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay(currentInput);
}

buttons.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  if (target.dataset.digit) {
    inputDigit(target.dataset.digit);
    return;
  }

  if (target.dataset.operator) {
    handleOperator(target.dataset.operator);
    return;
  }

  switch (target.dataset.action) {
    case "decimal":
      inputDecimal();
      break;
    case "equals":
      handleEquals();
      break;
    case "clear":
      handleClear();
      break;
    case "backspace":
      handleBackspace();
      break;
    default:
      break;
  }
});

document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (/\d/.test(key)) {
    inputDigit(key);
    return;
  }

  if (key === ".") {
    inputDecimal();
    return;
  }

  if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    handleEquals();
    return;
  }

  if (key === "Backspace") {
    handleBackspace();
    return;
  }

  if (key.toLowerCase() === "c") {
    handleClear();
  }
});

updateDisplay(currentInput);
