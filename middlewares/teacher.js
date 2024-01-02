const { Teachers } = require("../models/teacher.model");

const isTeacher = async (req, res, next) => {
  try {
    const userId = req.get("userAccess");
    const data = await Teachers.findOne({ userId });
    if (!data) return res.status(404).json({ message: "Teacher not found" });

    const roleTeacher = data.role;
    if (roleAdmin === "teacher" || roleAdmin === "superAdmin") {
      return next();
    } else if (roleAdmin === "student")
      return res.status(403).json({ message: "You should not be here" });
    res.status(400).json({ message: "You are not an admin nor a teacher" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  isTeacher,
};
