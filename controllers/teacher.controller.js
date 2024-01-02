const { Teachers } = require("../models/teacher.model");
const { Result } = require("../models/result.model");
const { Register } = require("../models/register.model");
const { Assignment } = require("../models/assignment.model");
const { Users } = require("../models/user.model");
const { Subjects } = require("../models/subject.model");
const { validateMongoID } = require("../utils/validateMongoID");
const asyncHandler = require("express-async-handler");
const { hashSync } = require("bcryptjs");

const fetchTeachersData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoID(id);
    const teacher = await Teachers.findById(id);
    if (!teacher)
      return res.status(404).json({ message: "Teacher not found!" });
    res
      .status(200)
      .json({ message: `Found ${teacher.name} data`, data: teacher });
  } catch (err) {
    res.status(500).json(err);
  }
});

const uploadTeachersData = asyncHandler(async (req, res) => {
  try {
    const { body, password } = req.body;
    const teacher = await Teachers.create({
      ...body,
      password: hashSync(password, 12),
    });
    res
      .status(201)
      .json({ message: "Teacher data uploaded successfully", data: teacher });
  } catch (err) {
    res.status(500).json(err);
  }
});

const fetchSpecificTeacherStudents = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoID(id);
    const teacher = await Register.findById({ teacherId: id });
    if (!teacher)
      return res.status(404).json({ message: "Teacher student not found" });
    res.status(200).json({ message: "Student gotten", teacher: teacher });
  } catch (err) {
    res.status(500).json(err);
  }
});

const postAssignment = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const assignment = await Assignment.create({
      ...body,
    });
    res
      .status(201)
      .json({ message: "Assignment posted successfully", data: assignment });
  } catch (err) {
    res.status(500).json(err);
  }
});

const uploadStudentResult = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const email = req.body.email;
    const student = await Users.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      const result = await Result.create({
        ...body,
        name: student.fullname,
        studentId: student.studentId,
        email: student.email,
      });
    }
    res.status(201).json({ message: "Result uploaded", result: result });
  } catch (err) {
    res.status(500).json(err);
  }
});

const editResult = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const email = body.email;
    const result = await Result.findOneAndUpdate(email, body);
    if (!result) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Result edited", result: result });
  } catch (err) {
    res.status(500).json(err);
  }
});

const setSubjects = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const subjects = await Subjects.create({
      ...body,
    });
    res.status(200).json({ message: "Subject set", data: subjects });
  } catch (err) {
    res.status(500).json(err);
  }
});

const isSubjectsSet = asyncHandler(async (req, res) => {
  try {
    const teacherId = req.params.id;
    validateMongoID(teacherId);
    const subject = await Subjects.findOne({ teacherId });
    if (!subject) return res.status(404).json({ message: "Teacher not found" });
    res.status(200).json({ message: "Subject set", subject: subject });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  isSubjectsSet,
  setSubjects,
  editResult,
  fetchSpecificTeacherStudents,
  uploadStudentResult,
  fetchTeachersData,
  postAssignment,
  uploadTeachersData,
};
