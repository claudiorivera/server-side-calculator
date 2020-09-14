const socket = io();
socket.on("message", (data) => {
  // Empty history display before we add the results
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  const parent = document.querySelector("#historyListContainer");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  // Add each result as a list item (bootstrap class)
  data.forEach((result) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerText = `${result.firstValue} ${result.operation} ${result.secondValue} = ${result.result}`;
    document.querySelector("#historyListContainer").append(li);
  });
});

// Class that provides a clearValues method
class Calculation {
  constructor(firstValue, secondValue, operation) {
    this.firstValue = firstValue || null;
    this.secondValue = secondValue || null;
    this.operation = operation || null;
  }
  clearValues() {
    this.firstValue = null;
    this.secondValue = null;
    this.operation = null;
  }
}

const calculation = new Calculation();

// Class for buttons which provides a method for enabling/disabling
class Button {
  constructor(id) {
    this.element = document.querySelector(`#${id}`);
  }

  enable = () => {
    this.element.removeAttribute("disabled");
  };

  disable = () => {
    this.element.setAttribute("disabled", "disabled");
  };
}

const calculateButton = new Button("calculateButton");
const decimalPointButton = new Button("decimalPointButton");

// TODO: Refactor the Button class to allow for classes or array of buttons, like these
const operationButtons = {
  enable: () => {
    document.querySelectorAll(".operationButton").forEach((button) => {
      button.removeAttribute("disabled");
    });
  },
  disable: () => {
    document.querySelectorAll(".operationButton").forEach((button) => {
      button.setAttribute("disabled", "disabled");
    });
  },
};

const getResults = async () => {
  try {
    const response = await fetch("/results");
    const data = await response.json();

    // Empty history display before we add the results
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    const parent = document.querySelector("#historyListContainer");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    // Add each result as a list item (bootstrap class)
    data.forEach((result) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerText = `${result.firstValue} ${result.operation} ${result.secondValue} = ${result.result}`;
      document.querySelector("#historyListContainer").append(li);
    });
  } catch (err) {
    alert(err);
  }
};

const clearResultsHistory = async () => {
  try {
    await fetch("/results", {
      method: "DELETE",
    });
    getResults();
    clearAll();
  } catch (err) {
    alert(err);
  }
};

const sendCalculation = async (calculation) => {
  try {
    await fetch("/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calculation),
    });
    getResults();
    clearAll();
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
    document.querySelector("#calcDisplay").value = "0";
    await sendCalculation(calculation);
    getResults();
    clearAll();
  } catch (err) {
    alert(err);
  }
};

// DOM READY
document.addEventListener("DOMContentLoaded", () => {
  getResults();
  clearAll();

  document
    .querySelector("#clearHistoryButton")
    .addEventListener("click", clearResultsHistory);

  // Add event listeners on every button and handle clicks based on button type
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
});
