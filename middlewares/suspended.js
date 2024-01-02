const { Users } = require("../models/user.model");

const isSuspended = async (req, res, next) => {
  try {
    const userId = req.get("userAccess");
    const user = await Users.findOne({ userAccess });
    if (user.suspended)
      return res.status(403).json({ message: "You are still on suspension" });
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { isSuspended };
