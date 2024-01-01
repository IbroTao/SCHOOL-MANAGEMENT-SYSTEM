const { Assignment } = require("../models/assignment.model");
const { validateMongoID } = require("../utils/validateMongoID");
const asyncHandler = require("express-async-handler");

// FETCH ALL ASSIGNMENTS
const fetchAssignments = asyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({
      createdAt: "asc",
    });
    if (!assignments)
      return res.status(404).json({ message: "Assignments not found" });
    res
      .status(200)
      .json({ message: "Assignments have been displayed", data: assignments });
  } catch (err) {
    throw new Error(err);
  }
});

// GET A SINGLE ASSIGNMENT
const getSingleAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoID(id);
  try {
    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res
      .status(200)
      .json({ message: `Successfully gotten ${assignment}`, data: assignment });
  } catch (err) {
    throw new Error(err);
  }
});

// EDIT AN ASSIGNMENT
const editAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoID(id);
  try {
    const assignment = await Assignment.findByIdAndUpdate(id, req.body);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res
      .status(200)
      .json({
        message: "Assignment edited and updated successfully",
        data: assignment,
      });
  } catch (err) {
    throw new Error(err);
  }
});

// DELETE AN ASSIGNMENT
const deleteAssignment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoID(id);
  try {
    const assignment = await Assignment.findByIdAndDelete(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json({ message: "Successfully deleted this assignment" });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  fetchAssignments,
  getSingleAssignment,
  editAssignment,
  deleteAssignment,
};
