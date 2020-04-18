const inputValue1 = $("#value1").val();
const inputValue2 = $("#value2").val();
const operation = $("#operator").val();

const messageToSendToServer = {
  value1: inputValue1,
  value2: inputValue2,
  operation: operation,
};
