const { Router } = require("express");
const router = Router();

const {
  fetchBlogs,
  getUserBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  editBlog,
} = require("../controllers/blog.controller");
const { isAuth } = require("../middlewares/auth");

router.get("/", fetchBlogs);
router.get("/:id", isAuth, getSingleBlog);
router.get("/", isAuth, getUserBlogs);
router.post("/", isAuth, createBlog);
router.put("/:id", isAuth, editBlog);
router.delete("/:id", isAuth, deleteBlog);

module.exports = router;
