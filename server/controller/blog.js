const Blog = require("../model/blog");

const createBlog = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

const getAllBlogs = (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

module.exports = {
  getAllBlogs,
  createBlog,
};
