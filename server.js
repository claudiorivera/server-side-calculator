const express = require("express");
const app = express();
const PORT = 3000;

// Array of operations
const calculations = [{ value1: 10, value2: 10, operation: "add" }];

// Middleware
app.use(express.json());
app.use(express.static("public"));
// GET
app.get("/", (req, res) => {
  res.sendStatus(200);
});

// POST
app.post("/calculate", (req, res) => {
  calculations.push(req.body);
  res.json(calculations);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
