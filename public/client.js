// Wait for DOM
$(document).ready(() => {
  // Calculate button calls the createMessage function
  $("#calculate").on("click", () => {
    function createMessage() {
      return {
        value1: $("#firstValue").val(),
        value2: $("#secondValue").val(),
        operation: $("#operation").val(),
      };
    }
    // TODO: POST to /calculate
    console.log(createMessage());
  });

  // Clear button clears the input fields
  $("#clear").on("click", () => {
    $("#firstValue").val("");
    $("#secondValue").val("");
  });

  // GET history from /history
  $.getJSON("/history", (historyCollection) => {
    // Iterate through each item
    historyCollection.forEach((historyItem) => {
      // Convert the operator into a math symbol (ie. +, -, *, /)
      let operationAsAString = "";
      switch (historyItem.operation) {
        case "add":
          operationAsAString = "+";
          break;
        case "subtract":
          operationAsAString = "-";
          break;
        case "multiply":
          operationAsAString = "*";
          break;
        case "divide":
          operationAsAString = "/";
          break;

        default:
          operationAsAString = "💩";
          break;
      }
      // Display the item
      $("#output").append(
        `<li class="list-group-item">${historyItem.value1}
        ${operationAsAString}
        ${historyItem.value2} =
        ${historyItem.result}`
      );
    });
  });
});
