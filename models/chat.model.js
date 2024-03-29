const mongoose = require("mongoose");

const Chats = mongoose.model(
  "chats",
  new mongoose.Schema(
    {
      username: {
        type: String,
        min: 2,
        max: 10,
        required: true,
      },
      email: {
        type: String,
        min: 4,
        max: 30,
        required: true,
      },
      password: {
        type: String,
        min: 7,
        required: true,
      },
      isImage: {
        type: Boolean,
        default: false,
      },
      image: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Chats };
