const Blog = require("../model/blog");
const { Tag } = require("../model/tag");

const createBlog = async (req, res) => {
  console.log(req.body);

  const result = await Tag.findOne({ name: req.body.tag }).exec();
  // check if the tag has existed
  const tag = result || new Tag({ name: req.body.tag });
  // create a new tag and blog
  const blog = new Blog({
    ...req.body,
    tag,
  });

  // save tag
  try {
    await tag.save();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to save tag to database." });
  }

  // save the blog
  try {
    await blog.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Failed to save blog to database." });
  }
  return res.sendStatus(201);
};

const getAllBlogs = (req, res) => {
  Blog.find()
    .sort("createdAt")
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

const updateBlog = async (req, res) => {
  const newBlog = req.body;

  //check if the tag exists
  const result = await Tag.findOne({ name: req.body.tag }).exec();
  const tag = result || new Tag({ name: req.body.tag });
  // save tag
  try {
    await tag.save();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to save tag to database." });
  }

  //replace blog
  const blogResult = await Blog.replaceOne(
    { _id: req.params.id },
    { ...newBlog, tag }
  );
  if (blogResult.matchedCount === 0) {
    return res.status(404).send({ message: "The post doesn't exist." });
  }

  return res.sendStatus(201);
};

const deleteBlog = (req, res) => {
  const id = req.params.id;

  Blog.deleteOne({ _id: id })
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(404));
};

module.exports = {
  getAllBlogs,
  createBlog,
  saveImage,
  getBlog,
  updateBlog,
  deleteBlog,
};
