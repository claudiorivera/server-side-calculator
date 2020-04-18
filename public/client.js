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
    // TODO: POST to server
    console.log(createMessage());
  });

  // Clear button clears the input fields
  $("#clear").on("click", () => {
    $("#firstValue").val("");
    $("#secondValue").val("");
  });
});
