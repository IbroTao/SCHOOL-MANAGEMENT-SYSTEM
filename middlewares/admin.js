const { Users } = require("../models/user.model");

const grantAccess = async (req, res, next) => {
  const userId = req.ger("userAccess");
  const data = await Users.findOne({ _id: userId });
  if (!data) return res.status(400).json({ message: "Something went wrong" });
  const roleAdmin = data.role;
  if (roleAdmin === "admin" || roleAdmin === "superAdmin") {
    return next();
  } else if (roleAdmin === "student")
    return res.status(403).json({ message: "You should not be here " });
  return res.status(400).json({ message: "You are not an admin" });
};

module.exports = {
  grantAccess,
};
