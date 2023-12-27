const mongoose = require("mongoose");

const Drafts = mongoose.model(
  "drafts",
  new mongoose.Schema(
    {
      header: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Drafts };
