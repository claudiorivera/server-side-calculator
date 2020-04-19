// Module imports
const express = require("express");
const app = express();
const PORT = 3000;
const { calculate } = require("./calculate");

// History of operations
const history = [
  {
    firstValue: 25,
    secondValue: 5,
    operation: "divide",
    result: 5,
  },
  {
    firstValue: 5,
    secondValue: 5,
    operation: "add",
    result: 10,
  },
];

// Middleware
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
