const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");
const displayContent = document.getElementById("display-content");
const digits = document.querySelectorAll(".digits > button");
const operators = document.querySelectorAll(".operators > button");

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return (a / b).toFixed(2);
};

const operate = (operator, a, b) => {
  if (operator === "+") return add(a, b);
  else if (operator === "-") return subtract(a, b);
  else if (operator === "*") return multiply(a, b);
  else if (operator === "/") return divide(a, b);
};

const showDisplay = (string = "") => {
  if (/[+*-/]/.test(displayContent.textContent)) {
    const regex = displayContent.textContent.match(
      /^([+-]?[0-9]+[.]?[0-9]*)([*+-/])([0-9]+)$/
    );

    const opr = regex[2];
    const num1 = parseFloat(regex[1]);
    const num2 = parseInt(regex[3]);

    if (!isNaN(num1) && !isNaN(num2)) {
      const result = operate(opr, num1, num2);

      displayContent.textContent =
        result == Infinity ? "can't divide by 0" : result + string;
    }
  } else if (/[0-9]+/.test(displayContent.textContent)) {
    displayContent.textContent += string;
  }
};

digits.forEach((number) => {
  number.addEventListener("click", () => {
    displayContent.textContent += number.value;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    showDisplay(operator.value);
  });
});

clearButton.addEventListener("click", () => (displayContent.textContent = ""));
equalButton.addEventListener("click", () => {
  showDisplay();
});
