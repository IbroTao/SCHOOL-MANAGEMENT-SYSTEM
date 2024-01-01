const express = require("express");
const io = require("socket.io");
const { db } = require("./configs/db");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const authRouter = require("./routes/auth.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const port = process.env.PORT;

// app.use(notFound);
// app.use(errorHandler);
app.use("/api/auth", authRouter);

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
