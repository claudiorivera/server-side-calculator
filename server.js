// Global module imports
const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const webhook = require("express-github-webhook");
require("dotenv").config();
const { exec } = require("child_process");

// My module imports
const { calculate } = require("./calculate");

// Environmental variables
const PORT = process.env.PORT || 3000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

// Instantiate Express
const app = express();
const webHookHandler = webhook({ path: "/webhook", secret: SECRET_TOKEN });

// Global variables
const history = [];

// Instantiate middleware
app.use(express.json());
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(webHookHandler);

// WebHooks
webHookHandler.on("*", function (event, repo, data) {
  console.log("webHookHandler event: ", event);
  exec("git pull", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

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
