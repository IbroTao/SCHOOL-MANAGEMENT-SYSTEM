const { Router } = require("express");
const { studentSignUp } = require("../controllers/auth.controller");
const router = Router();

router.post("/student/signup", studentSignUp);

module.exports = router;
