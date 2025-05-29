require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose');
const handler404 = require('./middleware/404Handler');
const handler500 = require('./middleware/500Handler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

connectDB();

switch (process.env.NODE_ENV) {
    case "development":
        const { logger, logEvents } = require('./middleware/logger');
        app.use(logger);
        break;
    case "production":
      break;
      default:
        break;
}
app.use(cors());
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Landing Page" });
});
app.use("/user", require('./routes/userRoute'));
app.use("/task", require('./routes/taskRoute'));

app.all('*', handler404);
app.use(handler500);

let server;
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

app.use(errorHandler);
