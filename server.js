const express = require("express");
const app = express();
const PORT = 3000;

// History of operations
const history = [
  { value1: 10, value2: 1, operation: "add", result: 11 },
  { value1: 20, value2: 2, operation: "subtract", result: 18 },
  { value1: 30, value2: 3, operation: "multiply", result: 90 },
  { value1: 40, value2: 4, operation: "divide", result: 10 },
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
  history.push({
    value1: req.body.value1,
    value2: req.body.value2,
    operation: req.body.operation,
    result: 5000,
  });
  // Send the history
  res.json(history);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
