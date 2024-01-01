const { SchoolBlog } = require("../models/blog.model");
const { Users } = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const { validateMongoID } = require("../utils/validateMongoID");

// FETCH ALL USERS & SYUDENTS BLOG
const fetchBlogs = asyncHandler(async (req, res) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 3;
    let totalItems;
    await SchoolBlog.find()
      .countDocuments()
      .then((count) => {
        totalItems = count;
        return SchoolBlog.find()
          .sort({
            createdAt: "desc",
          })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
      })
      .then((blogs) => {
        if (blogs === null)
          return res
            .status(400)
            .json({ message: "Oops!, there are not blogs to display." });
        res
          .status(200)
          .json({ status: true, blogs: blogs, totalItems: totalItems });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET A SPECFIC SINGLE BLOG
const getSingleBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await SchoolBlog.findOne(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json({ blog: blog });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL BLOGS CREATED BY A SPECFIC USER OR STUDENT
const getUserBlogs = asyncHandler(async (req, res) => {
  try {
    const blog = await SchoolBlog.find({ userId: req.get("userAccess") });
    if (!blog) return res.status(400).json("This user does not have any blogs");
    res.status(200).json({ blog: blog });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE A NEW BLOG
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { content, title } = req.body;
    const image = req.file;
    const user = await Users.findByIdAndUpdate(req.get("userAccess"));
    if (!user) return res.status(404).json({ message: "User not found" });
    const author = user.fullname;
    const blog = await SchoolBlog.create({
      content: content,
      title: title,
      author: author,
      userId: req.get("userAccess"),
      image: image.path,
    });
    res
      .status(201)
      .json({
        message: "Blog created successfully",
        blog: blog,
        blogId: blog._id,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EDIT A BLOG
const editBlog = asyncHandler(async (req, res) => {
  try {
    const image = req.file;
    const { title, description, content } = req.body;
    const blog = {
      image,
      title,
      description,
      image,
      content,
    };
    const blogId = req.params.id;
    validateMongoID(blogId);
    const editedBlog = await SchoolBlog.findByIdAndUpdate(blogId, blog);
    res
      .status(200)
      .json({ message: "Blog edited successfully", blog: editedBlog });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A BLOG
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    validateMongoID(blogId);
    const blog = await SchoolBlog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createBlog,
  deleteBlog,
  editBlog,
  fetchBlogs,
  getUserBlog,
  getSingleBlog,
};
