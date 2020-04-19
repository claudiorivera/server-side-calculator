// Wait for DOM
$(document).ready(() => {
  // Update the history display
  updateHistory();

  let firstValue = null;
  let secondValue = null;
  let operation = null;

  // Calculate button triggers message packaging and sending
  $("#calculate").on("click", () => {
    // Package the message to send
    let messageToSend = {
      firstValue,
      secondValue,
      operation,
    };

    // POST the message to /calculate
    $.ajax({
      type: "POST",
      url: "/calculate",
      data: JSON.stringify(messageToSend),
      // contentType is not json by default: https://api.jquery.com/jQuery.ajax/
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    });

    // Update the history display
    updateHistory();
  });
  // Clear input button clears the inputs
  $("#clearInput").on("click", () => {
    // TODO
  });
  // Clear history button clears the history
  $("#clearHistory").on("click", () => {
    // TODO
  });
  // Number button event handlers
  $(".numberButton").on("click", (event) => {
    const valueOfNumberButtonClicked = event.target.innerText;
    const $calcDisplay = $("#calcDisplay");
    const currentValue = $calcDisplay.val();
    // Disable the period after being pressed for the first time
    if (valueOfNumberButtonClicked === ".") {
      // TODO: DISABLE THE POINT BUTTON
    }
    // Clear the display if the value is 0 (ie. starting over)
    if (currentValue === "0") {
      $calcDisplay.val(valueOfNumberButtonClicked);

      // Otherwise, concatenate (as strings) the current and button value
    } else {
      $calcDisplay.val(currentValue + valueOfNumberButtonClicked);
    }
  });
  // Operation button event handlers
  $("#divide").on("click", () => {
    //TODO
  });
  $("#multiply").on("click", () => {
    //TODO
  });
  $("#subtract").on("click", () => {
    //TODO
  });
  $("#add").on("click", () => {
    //TODO
  });

  // Clear history and display contents from server
  function updateHistory() {
    // Clear history
    $("#history").empty();

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
          $("#history").append(
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
