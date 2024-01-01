const { Contacts } = require("../models/contact.model");
const asyncHandler = require("express-async-handler");
const { validateMongoID } = require("../utils/validateMongoID");

const fetchAllComplaints = asyncHandler(async (req, res) => {
  try {
    const complaints = await Contacts.find().sort({
      createdAt: "desc",
    });
    if (!complaints)
      return res.status(404).json({ message: "No complaints found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

const makeComplaints = asyncHandler(async (req, res) => {
  const { name, ward, complaint, email } = req.body;
  try {
    const complaint = await Contacts.create({
      name,
      ward,
      complaint,
      email,
    });
    res.status(200).json({
      message: "Complaint created and submitted",
      complaint: complaint,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteComplaints = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoID(id);
  try {
    const complaint = await Contacts.findByIdAndDelete(id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  fetchAllComplaints,
  makeComplaints,
  deleteComplaints,
};
