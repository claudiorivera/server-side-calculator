// Function takes in two values and an operator (ie. "add", "subtract")
function calculate(firstValue, secondValue, operation) {
  // Return a value calculated based on the operator
  switch (operation) {
    case "+":
      return String(Number(firstValue) + Number(secondValue));
      break;
    case "-":
      return String(Number(firstValue) - Number(secondValue));
      break;
    case "*":
      return String(Number(firstValue) * Number(secondValue));
      break;
    case "/":
      return String(Number(firstValue) / Number(secondValue));
      break;
    // Return 0 if a different operation is passed in
    default:
      return "Error";
      break;
  }
}

exports.calculate = calculate;
