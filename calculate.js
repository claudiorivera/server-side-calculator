// Function takes in two values and an operator (ie. "add", "subtract")
function calculate(firstValue, secondValue, operation) {
  // Return a value calculated based on the operator
  switch (operation) {
    case "+":
      return firstValue + secondValue;
      break;
    case "-":
      return firstValue - secondValue;
      break;
    case "*":
      return firstValue * secondValue;
      break;
    case "/":
      return firstValue / secondValue;
      break;
    // Return 0 if a different operation is passed in
    default:
      return 0;
      break;
  }
}

exports.calculate = calculate;
