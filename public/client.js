// Wait for DOM
$(document).ready(() => {
  // INITIALIZE DISPLAY AND VARIABLES

  // Update the history display
  updateHistory();

  // Declare global variables and convenience variables
  let firstValue = null;
  let secondValue = null;
  let operation = null;
  const $calcDisplay = $("#calcDisplay");

  // Disable the equals button
  $("#calculate").attr("disabled", "disabled");

  // Disable the operation buttons
  $(".operationButton").attr("disabled", "disabled");

  // EVENT HANDLERS
  // Calculate button triggers message packaging and sending
  $("#calculate").on("click", () => {
    // Since calculate button is only enabled after first value is stored
    // We can go ahead and store the second value
    secondValue = Number($calcDisplay.val());
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

    // Update the history display and clear the inputs
    updateHistory();
    clearInput();
  });

  // Clear input button clears the inputs
  $("#clearInput").on("click", clearInput);

  // Clear history button clears the history
  $("#clearHistory").on("click", () => {
    // TODO - Send DELETE command to server?
  });

  // Number button event handlers
  $(".numberButton").on("click", (event) => {
    // Enable operations if there's no operator and no first value
    if (operation === null && firstValue === null) {
      $(".operationButton").removeAttr("disabled");
    }

    // If we have an operation (implies we have a first value), enable the calculate button
    if (operation !== null) {
      $("#calculate").removeAttr("disabled");
    }

    // Hold values for convenience
    let valueOfNumberButtonClicked = event.target.innerText;
    let currentValue = $calcDisplay.val();

    // Disable the period after being pressed for the first time
    if (valueOfNumberButtonClicked === ".") {
      $("#point").attr("disabled", "disabled");
    }
    // Clear the display if the value is 0 (ie. at start)
    if (currentValue === "0") {
      $calcDisplay.val(valueOfNumberButtonClicked);

      // Otherwise, concatenate (as strings) the current and button value
    } else {
      $calcDisplay.val(currentValue + valueOfNumberButtonClicked);
    }
  });

  // Operation button event handlers - THIS SHOULD BE ON ONE LISTENER
  // WHEN WE STORE THE OPERATION, IT SHOULD KNOW WHO IS CALLING IT
  $("#divide").on("click", () => {
    // Disable operation buttons
    $(".operationButton").attr("disabled", "disabled");
    // Enable decimal point button
    $("#point").removeAttr("disabled");
    // Store the current display value as the first value
    firstValue = Number($calcDisplay.val());
    // Store the operation as add
    operation = "divide";
    // Reset the display to 0
    $calcDisplay.val("0");
  });
  $("#multiply").on("click", () => {
    // Disable operation buttons
    $(".operationButton").attr("disabled", "disabled");
    // Enable decimal point button
    $("#point").removeAttr("disabled");
    // Store the current display value as the first value
    firstValue = Number($calcDisplay.val());
    // Store the operation as add
    operation = "multiply";
    // Reset the display to 0
    $calcDisplay.val("0");
  });
  $("#subtract").on("click", () => {
    // Disable operation buttons
    $(".operationButton").attr("disabled", "disabled");
    // Enable decimal point button
    $("#point").removeAttr("disabled");
    // Store the current display value as the first value
    firstValue = Number($calcDisplay.val());
    // Store the operation as add
    operation = "subtract";
    // Reset the display to 0
    $calcDisplay.val("0");
  });
  $("#add").on("click", () => {
    // Disable operation buttons
    $(".operationButton").attr("disabled", "disabled");
    // Enable decimal point button
    $("#point").removeAttr("disabled");
    // Store the current display value as the first value
    firstValue = Number($calcDisplay.val());
    // Store the operation as add
    operation = "add";
    // Reset the display to 0
    $calcDisplay.val("0");
  });

  // FUNCTION DECLARATIONS
  // Clear inputs
  function clearInput() {
    // Enable the point button
    $("#point").removeAttr("disabled");
    // Disable the equals button
    $("#calculate").attr("disabled", "disabled");
    // Disable the operation buttons
    $(".operationButton").attr("disabled", "disabled");
    // Reset the display field to 0
    $("#calcDisplay").val("0");
    // Reset values and operation to null
    firstValue = null;
    secondValue = null;
    operation = null;
  }

  // Clear history and display contents from server
  function updateHistory() {
    // Clear history display
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
