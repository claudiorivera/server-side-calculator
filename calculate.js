// Function takes in two values and an operator (ie. "add", "subtract")
const calculate = (firstValue, secondValue, operation) => {
  // Return a value calculated based on the operator, as a string
  switch (operation) {
    case "+":
      return String(parseInt(firstValue) + parseInt(secondValue));
    case "-":
      return String(parseInt(firstValue) - parseInt(secondValue));
    case "*":
      return String(parseInt(firstValue) * parseInt(secondValue));
    case "/":
      return String(parseInt(firstValue) / parseInt(secondValue));
    default:
      return "Error";
  }
};

exports.calculate = calculate;
