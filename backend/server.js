require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Landing Page" });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log');
});