const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./config/mongoose");
const colors = require("colors");
db();
// dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in starting the express server: ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`.green.bold);
});
