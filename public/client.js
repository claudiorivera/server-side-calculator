const currentCalculation = {
  firstValue: null,
  secondValue: null,
  operation: null,
};

const clearValues = () => {
  currentCalculation.firstValue = null;
  currentCalculation.secondValue = null;
  currentCalculation.operation = null;
};

const getResultsHistory = async () => {
  try {
    const response = await fetch("/results");
    const data = await response.json();

    // Empty history display before we add the results
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    const parent = document.querySelector("#historyListParent");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    // Add each result as a list item (bootstrap class)
    data.forEach((result) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerText = `${result.firstValue} ${result.operation} ${result.secondValue} = ${result.result}`;
      document.querySelector("#historyListParent").append(li);
    });
  } catch (err) {
    console.log(err);
  }
};

const clearResultsHistory = async () => {
  try {
    await fetch("/results", {
      method: "DELETE",
    });
    getResultsHistory();
  } catch (err) {
    console.error(err);
  }
};

const sendCalculation = async (currentCalculation) => {
  try {
    await fetch("/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentCalculation),
    });
  } catch (err) {
    console.error(err);
  }
};

const clearAll = () => {
  clearValues();
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

const calculateButton = {
  enable: () => {
    document.querySelector("#calculateButton").removeAttribute("disabled");
  },
  disable: () => {
    document
      .querySelector("#calculateButton")
      .setAttribute("disabled", "disabled");
  },
};

const decimalPointButton = {
  enable: () => {
    document.querySelector("#decimalPointButton").removeAttribute("disabled");
  },
  disable: () => {
    document
      .querySelector("#decimalPointButton")
      .setAttribute("disabled", "disabled");
  },
};

const handleNumber = (value) => {
  // Handle first value input
  if (!currentCalculation.firstValue) {
    if (document.querySelector("#calcDisplay").value === "0") {
      document.querySelector("#calcDisplay").value = value;
      operationButtons.enable();
    } else {
      document.querySelector("#calcDisplay").value += value;
    }
  }
  // Handle second value input
  if (currentCalculation.firstValue) {
    if (document.querySelector("#calcDisplay").value === "0") {
      document.querySelector("#calcDisplay").value = value;
      calculateButton.enable();
    } else {
      document.querySelector("#calcDisplay").value += value;
    }
  }
};

const handleDecimal = (value) => {
  // If the value displayed is not a floating number
  if (parseInt(document.querySelector("#calcDisplay").value) % 1 === 0) {
    document.querySelector("#calcDisplay").value += value;
    decimalPointButton.disable();
  }
};

const handleOperation = (value) => {
  currentCalculation.firstValue = document.querySelector("#calcDisplay").value;
  currentCalculation.operation = value;
  // Reset the display to 0
  document.querySelector("#calcDisplay").value = "0";
  operationButtons.disable();
  decimalPointButton.enable();
};

const handleEnter = async () => {
  try {
    currentCalculation.secondValue = document.querySelector(
      "#calcDisplay"
    ).value;
    document.querySelector("#calcDisplay").value = "0";
    await sendCalculation(currentCalculation);
    clearAll();
    getResultsHistory();
  } catch (err) {
    console.log(err);
  }
};

const handleClear = () => {
  clearAll();
};

// DOM READY
document.addEventListener("DOMContentLoaded", () => {
  getResultsHistory();

  document
    .querySelector("#clearHistoryButton")
    .addEventListener("click", clearResultsHistory);

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
          handleClear(e.target.dataset.key);
          break;
        default:
          break;
      }
    });
  });
});
