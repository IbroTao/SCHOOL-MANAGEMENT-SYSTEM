const { Router } = require("express");
const router = Router();

const {
  fetchJuniorStudents,
  fetchSeniorStudents,
  fetchTeachers,
  fetchRegisteredStudents,
  getAdminData,
  fetchAllStudents,
  admitStudent,
  addTeacher,
  fetchBlackList,
  fetchNonTeachingStaff,
  fetchSuspendedStudents,
  postNotice,
} = require("../controllers/admin.controller");

const {
  fetchUserDataThroughEmail,
} = require("../src/controllers/users.controller");

const { grantAccess } = require("../middlewares/admin");

router.get("/junior", grantAccess, fetchJuniorStudents);
router.get("/senior", grantAccess, fetchSeniorStudents);
router.get("/teachers", grantAccess, fetchTeachers);
router.get("/students", fetchAllStudents);
router.get("/registrated", fetchRegisteredStudents);
router.get("/blacklisted", grantAccess, fetchBlackList);
router.get("/suspended", grantAccess, fetchSuspendedStudents);
router.get("/non-teaching", grantAccess, fetchNonTeachingStaff);
router.get("/fetch/email", fetchUserDataThroughEmail);
router.get("/admin/:id", getAdminData);
router.post("/add/teacher", addTeacher);
router.post("admit/:id", admitStudent);
router.post("/notice", grantAccess, postNotice);

module.exports = router;
