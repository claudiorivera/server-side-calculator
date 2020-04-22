const currentCalculation = {
  firstValue: null,
  secondValue: null,
  operation: null,
  readyToOperate: false,
  readyToCalculate: false,
  clearValues: () => {
    this.firstValue = null;
    this.secondValue = null;
    this.operation = null;
    this.readyToOperate = false;
    this.readyToCalculate = false;
  },
};
const getResultsHistory = () => {
  // TODO - Grab these from server
  let resultsHistory = [
    { firstValue: 1, secondValue: 2, operation: "add", result: 3 },
    { firstValue: 4, secondValue: 3, operation: "subtract", result: 1 },
  ];
  resultsHistory.forEach((result) => {
    // Parse operation name into symbol
    switch (result.operation) {
      case "add":
        result.operation = "+";
        break;
      case "subtract":
        result.operation = "-";
        break;
      case "multiply":
        result.operation = "*";
        break;
      case "divide":
        result.operation = "/";
        break;
      default:
        result.operation = "💩";
        break;
    }
  });
  return resultsHistory;
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
  currentCalculation.clearValues();
  operationButtons.disable();
  calculateButton.disable();
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

const handleNumber = (value) => {
  if (document.querySelector("#calcDisplay").value === "0") {
    document.querySelector("#calcDisplay").value = value;
    operationButtons.enable();
  }
};
const handleDecimal = (value) => {
  //
  console.log(`handleDecimal with value ${value}`);
};
const handleOperation = (value) => {
  //
  console.log(`handleOperation with value ${value}`);
};
const handleEnter = (value) => {
  //
  console.log(`handleEnter with value ${value}`);
};
const handleClear = (value) => {
  //
  console.log(`handleClear with value ${value}`);
};

// DOM READY
document.addEventListener("DOMContentLoaded", () => {
  clearAll();
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
