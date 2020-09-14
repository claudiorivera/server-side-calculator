const express = require("express");
const router = express.Router();

const { calculate } = require("../util/calculate");

const results = [];

// GET /results - Get all calculations
router.get("/", (req, res) => {
  req.app.io.emit("message", results);
  res.json(results);
});

// DELETE /results - Delete calculations from history
router.delete("/", (req, res) => {
  results.splice(0, results.length);
  res.json(results);
});

// POST /results - Create a new calculation
router.post("/", (req, res) => {
  // Push new object (with computed result) into the history array
  results.push({
    firstValue: req.body.firstValue,
    secondValue: req.body.secondValue,
    operation: req.body.operation,
    result: calculate(
      req.body.firstValue,
      req.body.secondValue,
      req.body.operation
    ),
  });
  res.json(results);
});

module.exports = router;
