const mongoose = require("mongoose");

const Contacts = mongoose.model(
  "contacts",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      complaint: {
        type: String,
        min: 10,
        max: 100,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Contacts };
