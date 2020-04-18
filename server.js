app.post("/calculate", (theMessageThatWasSent) => {
  calculate(
    theMessageThatWasSent.value1,
    theMessageThatWasSent.value2,
    theMessageThatWasSent.operation
  );
});
function calculate(value1, value2, operation) {
  switch (operation) {
    case "add":
      //DO THE ADDITION
      return value1 + value2;
      break;
    case "subtract":
      //DO THE subtration
      break;
    case "multiply":
      //DO THE multip
      break;
    case "divide":
      //DO THE div
      break;

    default:
      // YOU FUCKED UP
      break;
  }
}
