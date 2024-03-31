const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ["access", "refresh"],
    required: true,
  },
});
