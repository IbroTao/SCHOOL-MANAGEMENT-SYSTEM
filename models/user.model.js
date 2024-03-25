const mongoose = require("mongoose");

const Users = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: [true, "Fill out this form"],
      },
      email: {
        type: String,
        required: [true, "Provide a valid email"],
      },
      password: {
        type: String,
        required: [true, "Provide a secured password"],
      },
      // role: {
      //   type: String,
      //   required: true,
      // },
      refreshToken: {
        type: String,
      },
      passwordChangedAt: {
        type: Date,
      },
      passwordResetToken: {
        type: String,
      },
      passwordResetTokenExpiration: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Users };
