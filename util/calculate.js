// Function takes in two values and an operator (ie. "add", "subtract")
// And returns a the calculated result
const calculate = (firstValue, secondValue, operation) => {
  switch (operation) {
    case "+":
      return parseInt(firstValue) + parseInt(secondValue);
    case "-":
      return parseInt(firstValue) - parseInt(secondValue);
    case "*":
      return parseInt(firstValue) * parseInt(secondValue);
    case "/":
      return parseInt(firstValue) / parseInt(secondValue);
    default:
      return "Error";
  }
};

exports.calculate = calculate;
