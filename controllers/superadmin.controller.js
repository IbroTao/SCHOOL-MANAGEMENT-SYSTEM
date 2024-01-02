const { Users } = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const UserType = "admin";
const fetchAdmins = asyncHandler(async (req, res) => {
  try {
    const admin = await Users.find({ role: UserType });
    if (!admin) return res.status(404).json({ message: "No admin found" });
    res.status(200).json({ admin: admin });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { fetchAdmins };
