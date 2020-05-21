require("dotenv").config();
const express = require("express");
const favicon = require("express-favicon");
const path = require("path");

const { calculate } = require("./calculate");

// Environmental variables
const PORT = process.env.PORT || 5000;

// Instantiate express
const app = express();

// Global variables
const history = [];

// Instantiate middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Routes
// GET /history - Get all calculations
app.get("/history", (req, res) => {
  res.json(history);
});

// POST /calculate - Create a new calculation
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
  res.json(history);
});

// DELETE /history - Delete a calculation from history
app.delete("/history", (req, res) => {
  history.splice(0, history.length);
  res.json(history);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
