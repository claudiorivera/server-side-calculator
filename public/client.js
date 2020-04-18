// Wait for DOM
$(document).ready(() => {
  // Update the display
  updateDisplay();

  // Calculate button triggers message packaging and sending
  $("#calculate").on("click", () => {
    // Package the message to send

    let messageToSend = {
      firstValue: 4,
      secondValue: 20,
      operation: "add",
    };

    // Post the message
    $.post(
      "/calculate",
      messageToSend,
      function (data, textStatus, jqXHR) {
        console.log(`Success. Data: ${data}`);
      },
      "application/json"
    );

    // Update the display
    updateDisplay();
  });

  // Clear button clears the input fields
  $("#clear").on("click", () => {
    $("#firstValue").val("");
    $("#secondValue").val("");
  });

  // Clear output and display contents from server
  function updateDisplay() {
    // Clear output
    $("#output").empty();

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
          `<li class="list-group-item">${historyItem.firstValue}
        ${operationAsAString}
        ${historyItem.secondValue} =
        ${historyItem.result}</li>`
        );
      });
    });
  }
});
