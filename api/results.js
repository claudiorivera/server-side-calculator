const express = require("express");
const router = express.Router();

const calculate = require("../util/calculate");

const results = [];

// GET /results - Get all calculations
router.get("/", (req, res) => {
  req.app.io.emit("message", results);
  res.sendStatus(200);
});

// POST /results - Create a new calculation
router.post("/", (req, res) => {
  const { firstValue, secondValue, operation } = req.body;
  // Push new object (with computed result) into the history array
  results.unshift({
    firstValue,
    secondValue,
    operation,
    result: calculate(firstValue, secondValue, operation),
  });
  req.app.io.emit("message", results);
  res.sendStatus(200);
});

module.exports = router;
