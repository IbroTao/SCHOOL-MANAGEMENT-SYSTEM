const { Notice } = require("../models/notice.model");
const asyncHandler = require("express-async-handler");
const { validateMongoID } = require("../utils/validateMongoID");

const createNotice = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  const image = req.file;
  try {
    const notice = await Notice.create({
      title,
      image,
      description,
      content,
    });
    res.status(201).json({ message: "Notice created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

const editNotice = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  const { id } = req.params;
  validateMongoID(id);
  try {
    const notice = await Notice.findByIdAndUpdate(
      id,
      {
        title,
        description,
        content,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Notice edited successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteNotice = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  validateMongoID(id);
  try {
    const notice = await Notice.findByIdAndDelete(id);
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getAllNotices = asynncHandler(async (req, res) => {
  try {
    const notices = await Notice.find().sort({
      createdAt: "desc",
    });
    res.status(200).json({ notices: notices });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createNotice,
  editNotice,
  deleteNotice,
  getAllNotices,
};
