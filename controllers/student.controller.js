const { Result } = require("../models/result.model");
const { Users } = require("../models/user.model");
const { validateMongoID } = require("../utils/validateMongoID");
const asyncHandler = require("express-async-handler");

const fetchStudentData = asyncHandler(async (req, res) => {
  try {
    const id = req.get("userAccess");
    validateMongoID(id);
    const studentsData = await Users.findOne({ _id: id });
    if (!studentsData)
      return res.status(404).json({ message: "Could not get student data" });
    res.status(200).json({
      message: `Found ${studentsData.fullname} data`,
      data: studentsData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const checkResult = asyncHandler(async (req, res) => {
  try {
    const { email } = req.params;
    const result = await Result.findOne({ email });
    if (!result)
      return res
        .status(404)
        .json({ message: "You do not have any result yet, be patient" });
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  fetchStudentData,
  checkResult,
};
