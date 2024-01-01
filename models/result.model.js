const mongoose = require("mongoose");

const Result = mongoose.model(
  "result",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Please provide title for the result"],
      },
      name: {
        type: String,
      },
      position: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      remark: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      average: {
        type: String,
        required: true,
      },
      classAverage: {
        type: String,
        required: true,
      },
      adminRemark: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Result };
