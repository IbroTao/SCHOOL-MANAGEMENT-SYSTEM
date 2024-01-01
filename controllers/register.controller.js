const { Register } = require("../models/register.model");
const { sendMail } = require("../configs/mail");
const pdf = require("pdfkit");
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
      html: `Dear ${data.fullname}, your registration form has successfully been submitted`,
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


const getSingleRegistration =  asyncHandler(async(req, res) => {
    const {id} = req.params;
    validateMongoID(id);
    try{
        const registratedStudent = await Register.findById(id);
        if(!registratedStudent)
    }catch(err){
        res.status(500).json(err);
    }
})
