const mongoose = require("mongoose");

const Messages = mongoose.model(
  "messages",
  new mongoose.Schema(
    {
      message: {
        text: {
          type: String,
          required: true,
        },
        users: Array,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "chats",
        },
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Messages };
