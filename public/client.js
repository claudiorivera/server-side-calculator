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
    const response = await fetch("/history");
    const resultsHistory = await response.json();

    // Empty history display before we add the results
    var child = document.querySelector("#historyListParent").lastElementChild;
    while (child) {
      document.querySelector("#historyListParent").removeChild(child);
      child = document.querySelector("#historyListParent").lastElementChild;
    }

    // Add each result as a list item
    resultsHistory.forEach((result) => {
      let li = document.createElement("li");
      li.classList.add("list-group-item"); // Bootstrap class
      li.innerText = `${result.firstValue} ${result.operation} ${result.secondValue} = ${result.result}`;
      document.querySelector("#historyListParent").append(li);
    });
  } catch (err) {
    console.log(err);
  }
};

const clearResultsHistory = async () => {
  try {
    let response = await fetch("/history", {
      method: "DELETE",
    });
    getResultsHistory();
  } catch (err) {
    console.error(err);
  }
};

const sendCalculation = async (currentCalculation) => {
  try {
    let response = await fetch("/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentCalculation),
    });
    getResultsHistory();
    return response;
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
const getButtonType = (event) => {
  switch (event.currentTarget.accessKey) {
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
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      return "operation";
      break;
    case ".":
      return "decimal";
      break;
    case "Enter":
      return "enter";
      break;
    case "c":
      return "clear";
      break;
    default:
      return;
      break;
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
  if (Number(document.querySelector("#calcDisplay").value) % 1 === 0) {
    document.querySelector("#calcDisplay").value += value;
    decimalPointButton.disable();
  }
};
const handleOperation = (value) => {
  currentCalculation.firstValue = document.querySelector("#calcDisplay").value;
  currentCalculation.operation = value;
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
    let response = await sendCalculation(currentCalculation);
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

  document.querySelectorAll("button").forEach((element) => {
    element.addEventListener("click", (clickEvent) => {
      if (getButtonType(clickEvent) === "number") {
        handleNumber(clickEvent.target.accessKey);
      } else if (getButtonType(clickEvent) === "decimal") {
        handleDecimal(clickEvent.target.accessKey);
      } else if (getButtonType(clickEvent) === "operation") {
        handleOperation(clickEvent.target.accessKey);
      } else if (getButtonType(clickEvent) === "enter") {
        handleEnter(clickEvent.target.accessKey);
      } else if (getButtonType(clickEvent) === "clear") {
        handleClear(clickEvent.target.accessKey);
      } else return;
    });
  });
});
