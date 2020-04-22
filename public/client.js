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
const getResultsHistory = () => {
  let resultsHistory = [];

  fetch("/history")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultsHistory = data;
    });

  return resultsHistory;
};
const sendCalculation = (currentCalculation) => {
  fetch("/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentCalculation),
  }).catch((error) => {
    console.error("Error:", error);
  });
};
const refreshHistory = () => {
  let resultsHistory = getResultsHistory();
  resultsHistory.forEach((result) => {
    let li = document.createElement("li");
    li.classList.add("list-group-item"); // Bootstrap class
    li.innerText = `${result.firstValue} ${result.operation} ${result.secondValue} = ${result.result}`;
    document.querySelector("#historyListParent").append(li);
  });
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
const handleEnter = () => {
  currentCalculation.secondValue = document.querySelector("#calcDisplay").value;
  document.querySelector("#calcDisplay").value = "0";
  sendCalculation(currentCalculation);
};
const handleClear = () => {
  clearAll();
};

// DOM READY
document.addEventListener("DOMContentLoaded", () => {
  refreshHistory();
  // EVENT LISTENERS
  document.querySelectorAll("button").forEach((element) => {
    element.addEventListener("click", (event) => {
      //
      if (getButtonType(event) === "number") {
        handleNumber(event.target.accessKey);
      } else if (getButtonType(event) === "decimal") {
        handleDecimal(event.target.accessKey);
      } else if (getButtonType(event) === "operation") {
        handleOperation(event.target.accessKey);
      } else if (getButtonType(event) === "enter") {
        handleEnter(event.target.accessKey);
      } else if (getButtonType(event) === "clear") {
        handleClear(event.target.accessKey);
      } else return;
    });
  });
});
