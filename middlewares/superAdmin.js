const { Users } = require("../models/user.model");

const isSuperAdmin = async (req, res, next) => {
  const userId = req.get("userAccess");
  const data = await Users.findOne({ userId: userId });
  if (!data) return res.status(404).json({ message: "User not found" });
  const roleAdmin = data.role;
  if (roleAdmin === "superAdmin") {
    return next();
  } else if (roleAdmin === "student")
    return res.status(403).json({ message: "You should not there" });
  res.status(403).json({ message: "You are not a super admin" });
};

module.exports = { isSuperAdmin };
