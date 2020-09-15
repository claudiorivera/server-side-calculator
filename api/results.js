const express = require("express");
const router = express.Router();

const { calculate } = require("../util/calculate");

const results = [];

// GET /results - Get all calculations
router.get("/", (req, res) => {
  req.app.io.emit("message", results);
  res.sendStatus(200);
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
  req.app.io.emit("message", results);
  res.sendStatus(200);
});

module.exports = router;
