const { SchoolBlog } = require("../models/blog.model");
const { Users } = require("../models/user.model");

const fetchBlogArticles = async (req, res) => {
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
      .then((articles) => {
        if (articles === null)
          return res
            .status(400)
            .json({ message: "Oops!, there are not articles to display." });
        res
          .status(200)
          .json({ status: true, articles: articles, totalItems: totalItems });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleBlogArticle = async (req, res) => {
  try {
    const blog = await SchoolBlog.findOne(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json({ blog: blog });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserBlog = async (req, res) => {
  try {
    const blog = await SchoolBlog.find({ userId: req.get("user-access") });
    if (!blog) return res.status(400).json("This user does not have any blogs");
    res.status(200).json({ blog: blog });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createBlog = async (req, res) => {
  try {
    const {content, title} = req.body;
    const image = req.file;
    const user = await Users.findByIdAndUpdate(req.get("userAccess"));
    if(!user) return res.status(404).json({ message: "User not found"});
    const author = user.fullname;
    const blog = await SchoolBlog.create({
      content: content,
      title: title,
      author: author,
      userId: req.get("userAccess");
      image: image.path
    });
    res.status(201).json({ message: "Blog created", blog: blog});
  } catch (err) {
    res.status(500).json(err);
  }
};
