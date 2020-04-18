const express = require("express");
const app = express();
const PORT = 3000;

// History of operations
const history = [{ value1: 10, value2: 10, operation: "add", result: 30 }];

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
  // Calculate and push new object to history
  // TODO
  // Send the history
  res.json(history);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
