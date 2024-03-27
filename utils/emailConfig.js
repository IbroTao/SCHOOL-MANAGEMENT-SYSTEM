const nodemailer = require("nodemailer");
const sender = process.env.SMTP_NAME;
const emailAccess = process.env.SMTP_PASSWORD;
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 465;

const transporter = nodemailer.createTransport({
  service: "gmail",
  name: SMTP_NAME,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: sender,
    pass: emailAccess,
  },
});
