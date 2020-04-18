function calculate(firstValue, secondValue, operation) {
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
    default:
      return NaN;
      break;
  }
}

exports.calculate = calculate;
