const express = require("express");
const app = express();
const PORT = 3000;
const { calculate } = require("./calculate");

// History of operations
const history = [
  { firstValue: 10, secondValue: 1, operation: "add", result: 11 },
  { firstValue: 20, secondValue: 2, operation: "subtract", result: 18 },
  { firstValue: 30, secondValue: 3, operation: "multiply", result: 90 },
  { firstValue: 40, secondValue: 4, operation: "divide", result: 10 },
];

// Middleware instantiate
app.use(express.json());
app.use(express.static("public"));

// GET
app.get("/history", (req, res) => {
  // Send the history
  res.json(history);
});

// POST
app.post("/calculate", (req, res) => {
  // Push new object (with computed result) into the history array
  console.log(`req.body.firstValue: ${req.body.firstValue}`);

  history.push({
    firstValue: req.body.firstValue,
    secondValue: req.body.secondValue,
    operation: req.body.operation,
    result: calculate(
      req.body.firstValue,
      req.body.secondValue,
      req.body.operation
    ),
  });
  // Send the history
  res.json(history);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
