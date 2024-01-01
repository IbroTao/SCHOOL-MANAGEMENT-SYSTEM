const mongoose = require("mongoose");

const SchoolBlog = mongoose.model(
  "school_blog",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      userId: {
        type: String,
      },
      author: {
        type: String,
      },
      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { SchoolBlog };
