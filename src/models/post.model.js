const mongoose = require("mongoose");

const Posts = mongoose.model(
  "posts",
  new mongoose.Schema(
    {
      posts: {
        content: {
          type: String,
          required: true,
        },
        comments: {
          text: String,
          users: Array,
        },
        poster: {
          type: String,
          ref: "chats",
        },
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Posts };
