const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
// dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors());

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in starting the express server: ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});