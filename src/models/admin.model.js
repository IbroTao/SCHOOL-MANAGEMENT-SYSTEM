const mongoose = require("mongoose");

const Admin = mongoose.model(
  "admins",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Fill out this input area"],
      },
      email: {
        type: String,
        required: [true, "Provide a valid email"],
      },
      password: {
        type: String,
      },
      adminId: {
        type: String,
      },
      adminType: {
        type: String,
      },
      image: {
        type: String,
      },
      resetToken: {
        type: String,
      },
      resetTokenExpiration: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Admin };
