const { Users } = require("../models/user.model");
const { Register } = require("../models/register.model");
const asyncHandler = require("express-async-handler");
const { hashSync } = require("bcryptjs");
require("dotenv").config();

const JUNIOR_ID = process.env.JUNIOR_CLASS_ID;
const SENIOR_ID = process.env.SENIOR_CLASS_ID;
const JUNIOR1 = process.env.JUNIOR_CLASS1_ID;
const JUNIOR2 = process.env.JUNIOR_CLASS2_ID;
const JUNIOR3 = process.env.JUNIOR_CLASS3_ID;
const SENIOR1 = process.env.SENIOR_CLASS1_ID;
const SENIOR2 = process.env.SENIOR_CLASS2_ID;
const SENIOR3 = process.env.SENIOR_CLASS3_ID;
const J1_TEACHER = process.env.JUNIOR_CLASS1_TEACHER_ID;
const J2_TEACHER = process.env.JUNIOR_CLASS2_TEACHER_ID;
const J3_TEACHER = process.env.JUNIOR_CLASS3_TEACHER_ID;
const S1_TEACHER = process.env.SENIOR_CLASS1_TEACHER_ID;
const S2_TEACHER = process.env.SENIOR_CLASS2_TEACHER_ID;
const S3_TEACHER = process.env.SENIOR_CLASS3_TEACHER_ID;

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    if (!file)
      return res
        .status(400)
        .json({
          message:
            "File type not supported or file size extends the minimum standard",
        });
    const student = await Register.findById(req.params.id);
    let sectionId;
    let teacherId;
    let classId;
    if (
      student.classOfEntry === "JSS1" ||
      student.classOfEntry === "JSS2" ||
      student.classOfEntry === "JSS3"
    ) {
      sectionId = JUNIOR_ID;
      classId = JUNIOR_ID;
      if (student.classOfEntry === "JSS1") {
        classId = classId.concat(JUNIOR1);
        teacherId = J1_TEACHER;
      } else if (student.clasOfEntry === "JSS2") {
        classId = classId.concat(JUNIOR2);
        teacherId = J2_TEACHER;
      } else if (student.classOfEntry === "JSS3") {
        classId = classId.concat(JUNIOR3);
        teacherId = J3_TEACHER;
      }
    }

    if (
      student.classOfEntry === "SSS1" ||
      student.classOfEntry === "SSS2" ||
      student.classOfEntry === "SSS3"
    ) {
      sectionId = SENIOR_ID;
      classId = SENIOR_ID;
      if (student.classOfEntry === "SSS1") {
        classId = classId.concat(SENIOR1);
        teacherId = S1_TEACHER;
      } else if (student.classOfEntry === "SSS2") {
        classId = classId.concat(SENIOR2);
        teacherId = S2_TEACHER;
      } else if (student.classOfEntry === "SSS3") {
        classId = classId.concat(SENIOR3);
        teacherId = S3_TEACHER;
      }
    }

    const studentDetails = {
      fullname: student.fullname,
      email: student.email,
      password: student.password,
    };

    const uploadStudent = {
      fullname: studentDetails.fullname,
      email: studentDetails.email,
      password: hashSync(studentDetails.password, 12),
      image: file.path,
      classId: classId,
      sectionId: sectionId,
      userId: req.params.id,
      teacherId: teacherId,
    };
    res.status(200).json({ data: uploadStudent });
  } catch (err) {
    res.status(500).json(err);
  }
});

const editUserInfo = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    validateMongoID(id);
    const users = await Register.findByIdAndUpdate(id, body);
    if (!users) return res.status(404).json({ message: "Users not found" });
    res.status(200).json({ message: "User data updated", data: users });
  } catch (err) {
    res.status(500).json(err);
  }
});

const fetchUserData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Register.findById(id);
    if (!data) return res.status(404).json({ data: data });
  } catch (err) {
    res.status(500).json(err);
  }
});

const fetchUserDataThroughEmail = asyncHandler(async (req, res) => {
  try {
    const user = await Register.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

const editUserImage = asyncHandler(async (req, res) => {
  try {
    const image = req.file;
    if (!image) return res.status(400).json({ message: "No image uploaded" });
    let user = await Register.findById(req.params.id, image);
    res.status(200).json({ message: "User image updated", user: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  editUserImage,
  fetchUserData,
  fetchUserDataThroughEmail,
  editUserInfo,
  getUserInfo,
};
