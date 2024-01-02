const { Register } = require("../models/register.model");
const { sendMail } = require("../configs/mail");
const pdf = require("pdfkit");
const fs = require("fs");
const asyncHandler = require("express-async-handler");

const postRegistration = asyncHandler(async (req, res) => {
  const body = req.body;
  const image = image.path;
  try {
    const data = await Register.findOne({ email: body.email });
    if (data)
      return res
        .status(400)
        .json({ message: "You have submitted your data before." });

    const newData = await Register.create({
      ...body,
      image: image.path,
    });
    const response = sendMail({
      to: `${data.email}`,
      subject: "Registration for Admission into Smart Schools",
      html: `<p>Dear ${data.fullname}, your registration form has successfully been submitted</p>`,
    });
    response;
    res.status(200).json({
      message: `Dear ${data.fullname}, your registration form has been submitted`,
      data: newData,
      regId: newData._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getSingleRegistration = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoID(id);
    try {
      const registratedStudent = await Register.findById(id);
      if (!registratedStudent)
        res.status(404).json({ message: "User not found" });
      res.status(200).json({
        message: `Successfully gotten ${registratedStudent.fullname} details`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const editRegistration = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const { id } = req.params;
  validateMongoID(id);
  try {
    const registration = await Register.findByIdAndUpdate(id, body);
    res.status(200).json({
      message: `${registration.fullname}, your registration data has been edited and updated`,
    });

    const response = sendMail({
      to: body.email,
      subject: "Registration for Admission into Smart Schools",
      html: `<p>Dear ${registration.fullname}, your registration form has been edited and updated</p>`,
    });
    response;
  } catch (err) {
    res.status(500).json(err);
  }
});

const sendBiodata = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoID(id);
  const bioDataName = "bio-" + id + ".pdf";
  const bioDataPath = path.join("assets", "data", bioDataName);
  try {
    const data = await Register.findById(id);
    const pdfDoc = new pdf();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename = "' + bioDataName + '"'
    );
    pdfDoc.pipe(fs.createWriteStream(BioDataPath));
    pdfDoc.pipe(res);
    pdfDoc.addContent(data);
    pdfDoc.end();
  } catch (err) {}
});

module.exports = {
  sendBiodata,
  postRegistration,
  editRegistration,
  getSingleRegistration,
};
