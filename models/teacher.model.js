const mongoose = require("mongoose");

const Teachers = mongoose.model(
  "teachers",
  new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: [true, "Fill out this form"],
      },
      // role: {
      //   type: String,
      //   //required: true,
      // },
      email: {
        type: String,
        required: [true, "Provide a valid email"],
        unique: true,
      },
      password: {
        type: String,
      },
      class: {
        type: String,
      },
      classId: {
        type: String,
      },
      sectionId: {
        type: String,
      },
      teacherId: {
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

module.exports = { Teachers };
