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
    historyCollection.forEach((historyItem) => {
      let operationToString = "";
      switch (historyItem.operation) {
        case "add":
          operationToString = "+";
          break;
        case "subtract":
          operationToString = "-";
          break;
        case "multiply":
          operationToString = "*";
          break;
        case "divide":
          operationToString = "/";
          break;

        default:
          operationToString = "???";
          break;
      }
      $("#output").append(
        `<li class="list-group-item">${historyItem.value1}
        ${operationToString}
        ${historyItem.value2} =
        ${historyItem.result}`
      );
    });
  });
});
