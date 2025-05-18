const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const decimalBtn = document.getElementById("decimal");
const equalsBtn = document.getElementById("equals");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
function clear() {
  display.value = "";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  result = null;
}
function inputNumber(num) {
  if (result !== null) {
    clear();
  }
  display.value += num;
}
function inputOperator(op) {
  if (firstOperand === null) {
    firstOperand = parseFloat(display.value);
    operator = op;
    display.value = "";
  } else {
    secondOperand = parseFloat(display.value);
    result = calculate();
    display.value = result;
    firstOperand = result;
    secondOperand = null;
    operator = op;
  }
}
function calculate() {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
    case "x^y":
      return Math.pow(firstOperand, secondOperand);
    case "sin":
      return Math.sin(firstOperand);
    case "cos":
      return Math.cos(firstOperand);
    case "tan":
      return Math.tan(firstOperand);
    case "log":
      return Math.log10(firstOperand);
    case "√":
      return Math.sqrt(firstOperand);
    case "!":
      return factorial(firstOperand);
  }
}
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
clearBtn.addEventListener("click", clear);
decimalBtn.addEventListener("click", function () {
  if (!display.value.includes(".")) {
    display.value += ".";
  }
});
equalsBtn.addEventListener("click", function () {
  if (firstOperand !== null && operator !== null) {
    secondOperand = parseFloat(display.value);
    result = calculate();
    display.value = result;
    firstOperand = result;
    secondOperand = null;
    operator = null;
  }
});
numberBtns.forEach(function (button) {
  button.addEventListener("click", function () {
    inputNumber(button.textContent);
  });
});
operatorBtns.forEach(function (button) {
  button.addEventListener("click", function () {
    inputOperator(button.textContent);
  });
});
document.addEventListener("keydown", function (event) {
  if (/^[0-9]$/.test(event.key)) {
    inputNumber(event.key);
  } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    inputOperator(event.key);
  } else if (event.key === "Enter") {
    equalsBtn.click();
  } else if (event.key === "Escape") {
    clearBtn.click();
  } else if (event.key === "." || event.key === ",") {
    decimalBtn.click();
  }
});