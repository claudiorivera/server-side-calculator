// Function takes in two values and an operator (ie. "add", "subtract")
function calculate(firstValue, secondValue, operation) {
  // Return a value calculated based on the operator
  switch (operation) {
    case "add":
      return firstValue + secondValue;
      break;
    case "subtract":
      return firstValue - secondValue;
      break;
    case "multiply":
      return firstValue * secondValue;
      break;
    case "divide":
      return firstValue / secondValue;
      break;
    // Return 0 if a different operation is passed in
    default:
      return 0;
      break;
  }
}

exports.calculate = calculate;
