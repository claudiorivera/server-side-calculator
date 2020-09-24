const getResults = async () => {
  try {
    await fetch("/results");
  } catch (err) {
    alert(err);
  }
};

const clearAll = () => {
  calculation.clearValues();
  operationButtons.disable();
  calculateButton.disable();
  decimalPointButton.enable();
  document.querySelector("#calcDisplay").value = "0";
};

const handleNumber = (value) => {
  // Handle first value input
  if (!calculation.firstValue) {
    if (document.querySelector("#calcDisplay").value === "0") {
      document.querySelector("#calcDisplay").value = value;
      operationButtons.enable();
    } else {
      document.querySelector("#calcDisplay").value += value;
    }
  }
  // Handle second value input
  if (calculation.firstValue) {
    if (document.querySelector("#calcDisplay").value === "0") {
      document.querySelector("#calcDisplay").value = value;
      calculateButton.enable();
    } else {
      document.querySelector("#calcDisplay").value += value;
    }
  }
};

const handleDecimal = (value) => {
  // If the value displayed is not a floating number, concatenate as a string and disable
  // the decimal button
  if (parseInt(document.querySelector("#calcDisplay").value) % 1 === 0) {
    document.querySelector("#calcDisplay").value += value;
    decimalPointButton.disable();
  }
};

const handleOperation = (value) => {
  calculation.firstValue = document.querySelector("#calcDisplay").value;
  calculation.operation = value;
  // Reset the display to 0
  document.querySelector("#calcDisplay").value = "0";
  operationButtons.disable();
  decimalPointButton.enable();
};

const handleEnter = async () => {
  try {
    calculation.secondValue = document.querySelector("#calcDisplay").value;
    await calculate(calculation);
  } catch (err) {
    alert(err);
  }
};

const calculate = async (calculation) => {
  try {
    await fetch("/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calculation),
    });
    clearAll();
  } catch (err) {
    alert(err);
  }
};

const getButtonType = (e) => {
  switch (e.target.dataset.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return "number";
    case "+":
    case "-":
    case "*":
    case "/":
      return "operation";
    case ".":
      return "decimal";
    case "Enter":
      return "enter";
    case "c":
      return "clear";
    default:
      return;
  }
};

// Class for buttons which provides a method for enabling/disabling
// Handles id and class selectors
class Button {
  constructor(selector) {
    this.selectorType = selector.startsWith("#") ? "id" : "class";
    this.selectorType === "id"
      ? (this.element = document.querySelector(`${selector}`))
      : (this.elements = document.querySelectorAll(`${selector}`));
  }

  enable = () => {
    this.selectorType === "id"
      ? this.element.removeAttribute("disabled")
      : this.elements.forEach((element) => element.removeAttribute("disabled"));
  };

  disable = () => {
    this.selectorType === "id"
      ? this.element.setAttribute("disabled", true)
      : this.elements.forEach((element) =>
          element.setAttribute("disabled", true)
        );
  };
}

const calculateButton = new Button("#calculateButton");
const decimalPointButton = new Button("#decimalPointButton");
const operationButtons = new Button(".operationButton");

// Event listeners
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (getButtonType(e)) {
      case "number":
        handleNumber(e.target.dataset.key);
        break;
      case "decimal":
        handleDecimal(e.target.dataset.key);
        break;
      case "operation":
        handleOperation(e.target.dataset.key);
        break;
      case "enter":
        handleEnter(e.target.dataset.key);
        break;
      case "clear":
        clearAll();
        break;
      default:
        break;
    }
  });
});

// Updates results display any time there's a message from the server
const socket = io();
socket.on("message", (data) => {
  // Empty history display before we add the results
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  const parent = document.querySelector("#historyListContainer");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  // Add each result as a list item (with bootstrap class)
  data.forEach(({ firstValue, operation, secondValue, result }) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerText = `${firstValue} ${operation} ${secondValue} = ${result}`;
    document.querySelector("#historyListContainer").append(li);
  });
});

const calculation = {
  firstValue: null,
  secondValue: null,
  operation: null,
  clearValues: function () {
    this.firstValue = null;
    this.secondValue = null;
    this.operation = null;
  },
};

getResults();
clearAll();
