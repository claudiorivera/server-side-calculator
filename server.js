// Global module imports
const express = require("express");
const favicon = require('express-favicon');
const path = require("path")
// const GithubWebHook = require('express-github-webhook');

// My module imports
const { calculate } = require("./calculate");

// Instantiate Express
const app = express();

// Environmental variables
const PORT = process.env.PORT || 3000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;
console.log(`ST: ${SECRET_TOKEN}`);


// Global variables
const history = [];

// Instantiate middleware
app.use(express.json());
app.use(express.static("public"));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// var webhookHandler = GithubWebHook({ path: '/webhook', secret: SECRET_TOKEN });

// // Webhooks - TODO
// webhookHandler.on('*', function (event, repo, data) {
// });

// webhookHandler.on('event', function (repo, data) {
// });

// webhookHandler.on('reponame', function (event, data) {
// });

// webhookHandler.on('error', function (err, req, res) {
// });

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
