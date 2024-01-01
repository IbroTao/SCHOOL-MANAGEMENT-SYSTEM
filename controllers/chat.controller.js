const { Chats } = require("../models/chat.model");
const { Store } = require("../models/store.model");
const { Posts } = require("../models/post.model");
const { Messages } = require("../models/message.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { hashSync } = require("bcryptjs");
require("dotenv").configs();

const getToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.SECRET
  );
};

const chatSignUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const findUser = await Chats.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ message: "This username is already taken!" });

    const user = await Chats.create({
      username,
      email,
      password: hashSync(password, 12),
    });
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(200).json(err);
  }
});

const chatSignIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Chats.findOne({ username });
    if (!user)
      return res.status(404).json({ message: `${user.username} is not found` });
    const verifyPasswords = compareSync(password, user.password);
    if (!verifyPasswords)
      return res.status(400).json({ message: "Incorrect password, try again" });

    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

const users = asyncHandler(async (req, res) => {
  try {
    const users = await Chats.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json(err);
  }
});

const addMessages = asyncHandler(async (req, res) => {
  const { message, from, to } = req.body;
  try {
    const data = await Messages.create({
      text: message,
      users: [from, to],
      sender: from,
    });
    if (!data) return res.status(400).json({ message: "Failed to send!" });
    res.status(200).json({ message: "Sent successfully", data: data });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getMessages = asyncHandler(async (req, res) => {
  const { from, to } = req.body;
  try {
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const newMessages = messages.map((msg) => {
      return {
        fromUser: msg.message.sender.toString() === from,
        text: msg.message.text,
      };
    });
    res.status(200).json(newMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

const storePosts = asyncHandler(async (req, res) => {
  const { content, comment, second, text, from } = req.body;
  try {
    const data = await Posts.create({
      posts: {
        content: content,
        comment: {
          text: text,
          users: [from, second],
        },
        poster: from,
      },
    });
    if (!data) return res.status(400).json({ message: "Failed to send!" });
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  chatSignIn,
  chatSignUp,
  addMessages,
  getMessages,
  storePosts,
  users,
};
