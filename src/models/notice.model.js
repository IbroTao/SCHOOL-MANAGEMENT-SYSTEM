const mongoose = require("mongoose");

const Notice = mongoose.model(
  "motice",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Provide a title for the notice"],
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      content: {
        type: String,
        required: [true, "Provide content for the notice"],
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Notice };
