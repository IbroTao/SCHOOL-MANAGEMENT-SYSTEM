const express = require("express");
const { db } = require("./configs/db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const port = process.env.PORT;

const runApp = (port) => {
  db()
    .then((res) => {
      app.listen(port);
      console.log(`App is running on PORT ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
runApp(port);
