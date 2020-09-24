// Function takes in two values and an operator (ie. "add", "subtract")
// And returns the calculated result
const calculate = (firstValue, secondValue, operation) => {
  switch (operation) {
    case "+":
      return Number(firstValue) + Number(secondValue);
    case "-":
      return Number(firstValue) - Number(secondValue);
    case "*":
      return Number(firstValue) * Number(secondValue);
    case "/":
      return Number(firstValue) / Number(secondValue);
    default:
      return "Error";
  }
};

module.exports = calculate;
