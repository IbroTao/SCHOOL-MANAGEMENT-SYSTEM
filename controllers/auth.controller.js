const asyncHandler = require("express-async-handler");
const { Users } = require("../models/user.model");
const { Teachers } = require("../models/teacher.model");
const { Admin } = require("../models/admin.model");
const { Register } = require("../models/register.model");
const { hashSync, compareSync } = require("bcryptjs");
const { generateToken } = require("../configs/generateToken");
const { generateRefreshToken } = require("../configs/generateRefreshToken");
// const { sendMail } = require("../configs/mail");
const { randomBytes } = require("crypto");
require("dotenv").config();
const SECRET = process.env.SECRET;

// SIGNUP FOR STUDENTS AND USERS
const studentSignUp = asyncHandler(async (req, res) => {
  const { email, password, fullname } = req.body;
  try {
    const user = await Register.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User has already signed up" });
    }

    let newUser = await Users.create({
      fullname,
      email,
      password: hashSync(password, 12),
    });
    newUser.save();
    return res.status(201).json({
      message: `${newUser.fullname} has signed up successfully`,
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN FOR STUDENTS AND USERS
const studentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Register.findOne({ email });
    if (!student)
      return res
        .status(404)
        .json({ message: "User not found, try signing up" });
    if (student.admitted === false)
      return res.status(403).json("User has not been admitted");

    const user = await Users.findOne({ email });
    if (!user)
      res.status(404).json({ message: "User not found, try signing up" });
    const comparePassword = compareSync(password, student.password);
    if (!comparePassword)
      return res.status(403).json({ message: "Wrong password!" });
    if (user && comparePassword) {
      const refreshToken = await generateRefreshToken(user._id);
      const updatedUser = await Users.findByIdAndUpdate(
        user.id,
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.status(200).json({
        studentId: student._id,
        userId: user._id,
        user: updatedUser,
        token: generateToken(user._id),
        message: "User logged in",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const teacherSignUp = asyncHandler(async (req, res) => {
  const { name, email, password, teacherId } = req.body;
  try {
    const teacher = await Teachers.findOne({ email });
    if (teacher) {
      return res.status(400).json({ message: "Teacher has already signed up" });
    }

    const newTeacher = await Teachers.create({
      name,
      email,
      password: hashSync(password, 12),
    });
    const token = generateToken(newTeacher);
    newTeacher.save();
    return res.status(201).json({
      message: `${newTeacher.name} has signed up successfully`,
      token: token,
      teacherId: newUser.teacherId,
    });
  } catch (err) {
    throw new Error(err);
  }
});

// LOGIN FOR TEACHERS
const loginTeachers = asyncHandler(async (req, res) => {
  const { email, password, teacherId } = req.body;
  try {
    const teacher = await Teachers.findOne({ email });
    if (!teacher)
      return res
        .status(404)
        .json({ message: "Teacher not found, try logging in!" });

    const comparePassword = compareSync(password, teacher.password);
    if (!comparePassword)
      return res.status(403).json({ message: "Wrong password!" });

    if (teacher && comparePassword) {
      const refreshToken = await generateRefreshToken(user._id);
      const updatedTeacher = await Teachers.findByIdAndUpdate(
        teacher.id,
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
    }
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json({
      userId: teacher._id,
      teacherId: teacher._teacherId,
      message: "Teacher logged in successfully",
      user: updatedTeacher,
      token: generateToken(teacher._id),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const adminSignUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file;
    if (!req.file)
      return res.status(400).json({ mesaage: "No image attached" });

    const admin = await Admin.findOne({ email });
    if (admin) res.status(400).json({ message: "Admin already exists" });
    const newAdmin = await Admin.create({
      name,
      email,
      image: image.path,
      password: hashSync(password, 12),
      adminType: "primary",
      adminId: "0012",
    });
    const token = generateToken(newAdmin);
    res.status(201).json({
      message: `${newAdmin.name} successfully signed in`,
      token: token,
      adminId: admin._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN FOR ADMIN
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(404)
        .json({ message: "Admin not found, try signing in" });

    const comparePassword = compareSync(password, admin.password);
    if (!comparePassword)
      return res.status(403).json({ message: "Wrong password!" });
    admin.role = "admin";
    if (admin && comparePassword) {
      const refreshToken = await generateRefreshToken(admin._id);
      const updatedAdmin = await Admin.findByIdAndUpdate(
        admin.id,
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.status(200).json({
        adminId: admin._id,
        message: `${admin.name} is logged in!`,
        token: generateToken(admin._id),
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const refreshToken = asyncHandler(async (req, res) => {});

const resetPasswordLink = asyncHandler(async (req, res) => {
  randomBytes(32, (err, buffer) => {
    if (err)
      return res.status(400).json({ message: "Cannot generate random byte" });
    var cryptoToken = buffer.toString("hex");

    let user = Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).json({ message: "No user with this credentials" });

    user.passwordResetToken = cryptoToken;
    user.passwordResetTokenExpiration = Date.now() + 3600000;
    user.save();
    return res
      .status(201)
      .json({ message: "Password reset link successfully sent", data: users });
  });
});

const storePassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
    let user = await Users.findOne({
      passwordResetToken: req.params.token,
      passwordResetTokenExpiration: {
        $gt: Date.now(),
      },
      _id: body.userId,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Something went wrong, try getting another link" });
    }
    user.password = hashSync(password, 12);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;
    user.save();

    const response = sendMail({
      to: user.email,
      subject: "Password reset link",
      html: `<p>${user.fullname}, your password has been successfully, visit <a href="http://localhost:5000/auth/student/signup"> to confirm your changes.</p>`,
    });
    response;
    return res.status(200).json({
      message: "Password changed successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  studentSignUp,
  studentLogin,
  teacherSignUp,
  loginTeachers,
  adminSignUp,
  adminLogin,
  resetPasswordLink,
  storePassword,
};
