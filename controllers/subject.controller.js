const { Subjects } = require("../models/subject.model");
const asyncHandler = require("express-async-handler");
const { validateMongoID } = require("../utils/validateMongoID");

const addSubjects = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const userId = req.get("userAccess");
    validateMongoID(userId);
    const subjects = await Subject.create({
      ...body,
      userId: userId,
    });
    res.status(201).json({ message: "Subjects added", subjects: subjects });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getSubjects = asyncHandler(async (req, res) => {
  try {
    const userId = req.get("userAccess");
    validateMongoID(userId);
    const subjects = await Subjects.findOne({ userId: userId });
    if (!subjects)
      return res
        .status(404)
        .json({ message: "Subjects combination of this user not found" });
    res.status(200).json({ subjects: subjects });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  addSubjects,
  getSubjects,
};
