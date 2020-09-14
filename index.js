const express = require("express");
const path = require("path");

// Environmental variables
const PORT = process.env.PORT || 5000;

// Instantiate express
const app = express();

// Instantiate middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/results", require("./api/results"));

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
