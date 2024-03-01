const { Router } = require("express");
const {
  studentSignUp,
  studentLogin,
} = require("../controllers/auth.controller");
const router = Router();

router.post("/signup", studentSignUp);
router.post("/login", studentLogin);

module.exports = router;
