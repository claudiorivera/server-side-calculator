// Wait for DOM
$(document).ready(() => {
  // Update the display
  updateDisplay();

  // Calculate button triggers message packaging and sending
  $("#calculate").on("click", () => {
    // Package the message to send

    let messageToSend = {
      firstValue: parseInt($("#firstValue").val()),
      secondValue: parseInt($("#secondValue").val()),
      operation: $("#operation").val(),
    };

    // POST the message to /calculate
    $.ajax({
      type: "POST",
      url: "/calculate",
      data: JSON.stringify(messageToSend),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(`In ajax success response: ${response}`);
      },
    });

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
    $.get(
      "/history",
      function (historyItems) {
        // Iterate through each item
        historyItems.forEach((item) => {
          // Convert the operator into a math symbol (ie. +, -, *, /)
          let operationAsAString = "";
          switch (item.operation) {
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
            `<li class="list-group-item">${item.firstValue}
        ${operationAsAString}
        ${item.secondValue} =
        ${item.result}</li>`
          );
        });
      },
      "json"
    );
  }
});
