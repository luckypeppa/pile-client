const Blog = require("../model/blog");
const Tag = require("../model/tag");

const createBlog = async (req, res) => {
  const { title, snippet, body, coverUrl, tags } = req.body;

  //create a new blog
  const blog = new Blog({
    title,
    snippet,
    body,
    coverUrl,
  });

  for (const t of tags) {
    try {
      //check if the tag exists
      const result = await Tag.findOne({ name: t }).exec();
      let tag;
      if (result) {
        tag = result;
      } else {
        tag = new Tag({ name: t });
      }

      // set blog's tags
      blog.tags.push(tag);

      // set tag's blogs
      tag.blogs.push(blog);
      await tag.save();
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  // save blog
  try {
    await blog.save();
  } catch (err) {
    return res.status(500).send({ message: err });
  }

  res.sendStatus(201);
};

const getAllBlogs = (req, res) => {
  Blog.find()
    .sort("createdAt")
    .populate("tags", "name")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

const saveImage = (req, res) => {
  if (req.files) {
    console.log(req.files);
    const ext = req.files.file.name.split(".")[1];
    const randomName = Math.random().toString().slice(2, 14);
    const imageUrl = `images/${randomName}.${ext}`;
    req.files.file.mv("public/" + imageUrl, (err) => {
      if (err) res.sendStatus(500);
      res.send({ imageUrl });
    });
  }
};

const getBlog = (req, res) => {
  Blog.findById(req.params.id)
    .populate("tags", "name")
    .then((result) => {
      if (!result) return res.status(404);
      res.send({ blog: result });
    });
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, snippet, body, coverUrl, tags } = req.body;

  //create a new blog
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(
      { _id: id },
      {
        title,
        snippet,
        body,
        coverUrl,
      },
      {
        new: true,
        overwrite: true,
      }
    ).exec();
    if (!blog) return res.status(404).send({ message: "Not Found" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }

  for (const t of tags) {
    try {
      //check if the tag exists
      const result = await Tag.findOne({ name: t });
      let tag;
      if (result) {
        tag = result;
      } else {
        tag = new Tag({ name: t });
      }

      // set blog's tags
      blog.tags.push(tag);

      // set tag's blogs
      tag.blogs.push(blog);
      await tag.save();
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  // save blog
  try {
    await blog.save();
  } catch (err) {
    return res.status(500).send({ message: err });
  }

  res.sendStatus(201);
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
