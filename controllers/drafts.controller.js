const { Drafts } = require("../models/drafts.model");
const asyncHandler = require("express-async-handler");
const { validateMongoID } = require("../utils/validateMongoID");

const createDrafts = asyncHandler(async (req, res) => {
  try {
    const id = req.get("userAccesss");
    const body = req.body;
    const draft = await Drafts.create({
      header: body.header,
      content: body.content,
      userId: id,
    });
    res
      .status(201)
      .json({
        message: "Documents added to drafts",
        draft: draft,
        draftId: draft._id,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getDrafts = asyncHandler(async (req, res) => {
  try {
    const id = req.get("userAccesss");
    validateMongoID(id);
    const drafts = await Drafts.find({ userId: id });
    if (!drafts) return res.status(404).json({ message: "Drafts not found" });
    res.status(200).json({ drafts: drafts });
  } catch (err) {
    res.status(500).json(err);
  }
});

const editDrafts = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const draftId = req.params.id;
    validateMongoID(id);
    const draft = await Drafts.findByIdAndUpdate(body, draftId);
    res.status(200).json({ message: "Draft edited successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteDraft = asyncHandler(async (req, res) => {
  try {
    const draftId = req.params.id;
    validateMongoID(draftId);
    const draft = await Drafts.findByIdAndDelete(draftId);
    res.status(200).json({ message: "Draft deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createDrafts,
  getDrafts,
  editDrafts,
  deleteDraft,
};
