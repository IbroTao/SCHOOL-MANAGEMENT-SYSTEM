const mongoose = require("mongoose");

const Subjects = mongoose.model(
  "subjects",
  new mongoose.Schema(
    {
      maths: {
        type: Boolean,
        default: false,
      },
      english: {
        type: Boolean,
        default: false,
      },
      civic: {
        type: Boolean,
        default: false,
      },
      biology: {
        type: Boolean,
        default: false,
      },
      chemistry: {
        type: Boolean,
        default: false,
      },
      physics: {
        type: Boolean,
        default: false,
      },
      government: {
        type: Boolean,
        default: false,
      },
      literature: {
        type: Boolean,
        default: false,
      },
      commerce: {
        type: Boolean,
        default: false,
      },
      faccount: {
        type: Boolean,
        default: false,
      },
      geography: {
        type: Boolean,
        default: false,
      },
      economics: {
        type: Boolean,
        default: false,
      },
      fmaths: {
        type: Boolean,
        default: false,
      },
      dprocessing: {
        type: Boolean,
        default: false,
      },
      teacherId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Subjects };
