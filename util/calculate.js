// Function takes in two values and an operator (ie. "add", "subtract")
// And returns the calculated result
const calculate = (firstValue, secondValue, operation) => {
  switch (operation) {
    case "+":
      return parseFloat(firstValue) + parseFloat(secondValue);
    case "-":
      return parseFloat(firstValue) - parseFloat(secondValue);
    case "*":
      return parseFloat(firstValue) * parseFloat(secondValue);
    case "/":
      return parseFloat(firstValue) / parseFloat(secondValue);
    default:
      return "Error";
  }
};

exports.calculate = calculate;
