const Blog = require("../model/blog");
const { Tag } = require("../model/tag");

const createBlog = (req, res) => {
  console.log(req.body);
  const tag = new Tag({ name: req.body.tag });
  const blog = new Blog({
    ...req.body,
    tag,
  });

  tag.save().catch((err) => console.log(err));

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

const saveImage = (req, res) => {
  if (req.files) {
    console.log(req.files);
    const ext = req.files.file.name.split(".")[1];
    const randomName = Math.random().toString().slice(2, 14);
    const imageUrl = `/images/${randomName}.${ext}`;
    req.files.file.mv("public" + imageUrl, (err) => {
      if (err) res.sendStatus(500);
      res.send({ imageUrl });
    });
  }
};

const getBlog = (req, res) => {
  Blog.findById(req.params.id)
    .exec()
    .then((result) => {
      if (!result) return res.status(404);
      res.send({ blog: result });
    });
};

const updateBlog = (req, res) => {
  const newBlog = req.body;
  const tag = new Tag({ name: req.body.tag });

  tag.save();

  Blog.replaceOne({ _id: req.params.id }, { ...newBlog, tag })
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(404));
};

module.exports = {
  getAllBlogs,
  createBlog,
  saveImage,
  getBlog,
  updateBlog,
};
