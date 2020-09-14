const express = require("express");
const path = require("path");

// Environmental variables
const PORT = process.env.PORT || 5000;

// Instantiate express
const app = express();
const io = require("socket.io")(
  app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`);
  })
);

// Instantiate middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

// https://stackoverflow.com/questions/37559610/socket-io-emit-on-express-route/37560779
app.io = io;

// Routes
app.use("/results", require("./api/results"));
