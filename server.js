// Module imports
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { calculate } = require("./calculate");
const favicon = require('express-favicon');

// History of operations
const history = [];

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(favicon(__dirname + '/public/favicon.ico'));


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

// DELETE
app.delete("/history", (req, res) => {
  history.splice(0, history.length);
  res.json(history);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
