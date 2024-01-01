const { getIo } = require("../src/mixins/connectionSocket");
const { Admin } = require("../src/models/admin.model");
const { Register } = require("../src/models/register.model");
const { Users } = require("../src/models/user.model");
const { Teachers } = require("../src/models/teacher.model");
const { Notice } = require("../src/models/notice.model");
const asyncHandler = require("express-async-handler");

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

// GET ADMIN DATA
const getAdminData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findById(id);
  if (!admin) return res.status(500).json({ msg: "Admin doesn't exist" });
  res.status(200).json({
    image: admin.image,
    name: admin.name,
    email: admin.email,
    adminType: admin.adminType,
  });
});

// ADMIT A NEW STUDENT
const admitStudent = asyncHandler(async (req, res) => {
  try {
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
    student.admitted = true;
    student.class = student.classOfEntry;
    student.classId = classId;
    student.sectionId = sectionId;
    student.teacherId = teacherId;
    student.save();
    return res.status(201).json({ msg: "Student admitted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADMIT STUDENT THROUGH HIS/HER E-MAIL
const admitStudentByEmail = asyncHandler(async (req, res) => {
  Register.findOne({ email: req.body.email })
    .then((student) => {
      let teacherId;
      let sectionId;
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
        } else if (student.classOfEntry === "JSS2") {
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

      student.admitted = true;
      student.class = student.classOfEntry;
      student.classId = classId;
      student.teacherId = teacherId;
      student.sectionId = sectionId;
      student.save();
      return res.status(201).json({ message: "Student admitted" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// FETCH STUDENTS ONLY IN THE JUNIOR SECTION
const fetchJuniorStudents = asyncHandler(async (req, res) => {
  const { sectionId } = req.body;
  try {
    const students = await Register.find({ sectionId: JUNIOR_ID });
    if (!students) return res.status(400).json("");
    return res.status(200).json({ data: students });
  } catch (err) {
    res.status(500).json(err);
  }
});

// FETCH STUDENTS ONLY IN THE SENIOR SECTION
const fetchSeniorStudents = asyncHandler(async (req, res) => {
  const { sectionId } = req.body;
  try {
    const students = await Register.find({ sectionId: SENIOR_ID });
    if (!students) return res.status(400).json("");
    return res.status(200).json({ data: students });
  } catch (err) {
    res.status(500).json(err);
  }
});

// FETCH ALL STUDENTS DATA
const fetchAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Users.find().sort({
      email: "asc",
    });
    if (!students) return res.status(400).json("");
    return res.status(200).json({ data: students });
  } catch (err) {
    res.status(500).json(err);
  }
});

// SUSPEND A STUDENT
const suspendStudent = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const student = await Register.findOne({ email });
    student.suspended = true;
    student.save();
    res
      .status(200)
      .json({ message: `${student.fullname} is suspended.`, data: student });
  } catch (err) {
    res.status(500).json(err);
  }
});

// REMOVE A STUDENT FROM SUSPENSION
const resumeSuspendStudent = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Register.findOne({ email });
    student.suspended = false;
    student.save();
    res.status(200).json({
      message: `${student.fullname} can resume from suspension`,
      data: student,
    });
  } catch (err) {
    throw new Error(err);
  }
});

// ADD A STUDENT TO BLACKLIST
const addStudentToBlacklist = asyncHandler(async (req, res) => {
  try {
    const student = await Register.findOne({ email });
    student.blacklisted = true;
    student.save();
    res.status(200).json({
      message: `${student.fullname} has been blacklisted`,
      data: student,
    });
  } catch (err) {
    throw new Error(err);
  }
});

// FETCH ALL BLACKLISTED STUDENTS
const fetchBlackList = asyncHandler(async (req, res) => {});

// FETCH ALL SUSPENDED STUDENTS
const fetchSuspendedStudents = asyncHandler(async (req, res) => {});

// ADD A TEACHER
const addTeacher = asyncHandler(async (req, res) => {
  const body = req.body;
  const image = req.file;
  if (!image) return res.status(400).json("No image provided");
  const verifyTeacher = await Teachers.findOne({ email: body.email });
  if (verifyTeacher) return res.status(400).json("Teacher already added");
  let teacherId;
  let sectionId;
  let classId;
  if (body.class === "JSS1" || body.class === "JSS2" || body.class === "JSS3") {
    sectionId = JUNIOR_ID;
    classId = JUNIOR_ID;
    if (body.class === "JSS1") {
      classId = classId.concat(JUNIOR1);
      teacherId = J1_TEACHER;
    } else if (body.class === "JSS2") {
      classId = classId.concat(JUNIOR2);
      teacherId = J2_TEACHER;
    } else if (body.class === "JSS3") {
      classId = classId.concat(JUNIOR3);
      teacherId = J3_TEACHER;
    }
  }

  if (body.class === "SSS1" || body.class === "SSS2" || body.class === "SSS3") {
    sectionId = SENIOR_ID;
    classId = SENIOR_ID;
    if (body.class === "SSS1") {
      classId = classId.concat(SENIOR1);
      teacherId = S1_TEACHER;
    } else if (body.class === "SSS2") {
      classId = classId.concat(SENIOR2);
      teacherId = S2_TEACHER;
    } else if (body.class === "SSS3") {
      classId = classId.concat(SENIOR3);
      teacherId = S3_TEACHER;
    }
  }

  const teacher = await Teachers.create({
    ...body,
    classId: classId,
    sectionId: sectionId,
    teacherId: teacherId,
    image: image.path,
  });
  if (!teacher) return res.status(400).json({ message: "Teacher not added" });
  res
    .status(201)
    .json({ message: "Teacher added successfully", data: teacher });
});

// FETCH ALL TEACHERS
const fetchTeachers = asyncHandler(async (req, res) => {
  try {
    const teachers = await Users.find({ role: "teacher" });
    if (!teachers)
      return res.status(404).json({ message: "Teachers not found" });
    res.status(200).json({ message: "All teachers found", data: teachers });
  } catch (err) {
    throw new Error(err);
  }
});

// FETCH ALL NON-TEACHING STAFF
const fetchNonTeachingStaff = asyncHandler(async (req, res) => {
  try {
    const nonTeachers = await Users.find({ role: "non-teaching" });
    if (!nonTeachers)
      return res.status(404).json("No non-teaching staff found");
    res.status(200).json({
      message: "All non-teaching gotten successfully",
      data: nonTeachers,
    });
  } catch (err) {
    throw new Error(err);
  }
});

// POST NOTICE TO STUDENT PORTAL
const postNotice = asyncHandler(async (req, res) => {
  const { body } = req;
  try {
    let notice = await Notice.create({
      ...body,
    });
    getIo().emit("notice", {
      action: "create",
      notice: notice,
    });
    res.status(201).json({
      message: "Notice created and sent to the notice portal",
      data: notice,
    });
  } catch (err) {
    throw new Error(err);
  }
});

// FETCH REGISTERED STUDENTS
const fetchRegisteredStudents = asyncHandler(async (req, res) => {
  const students = await Register.find().sort({
    timestamps: "asc",
  });
  if (!students) throw new Error({ message: "No registered students found" });
  res.status(200).json({ message: "Registered students", data: students });
});

module.exports = {
  getAdminData,
  admitStudent,
  admitStudentByEmail,
  fetchJuniorStudents,
  fetchSeniorStudents,
  suspendStudent,
  resumeSuspendStudent,
  addStudentToBlacklist,
  fetchBlackList,
  fetchSuspendedStudents,
  fetchTeachers,
  fetchNonTeachingStaff,
  addTeacher,
  postNotice,
  fetchRegisteredStudents,
};
