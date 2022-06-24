const Blog = require("../model/blog");
const Comment = require("../model/comment");
const User = require("../model/user");

async function createComment(req, res) {
  const { authorId, body, parentId, blogId } = req.body;

  try {
    // check if author exists
    const author = await checkExistenceById(authorId, User, "author", res);

    if (parentId) {
      const comment = await checkExistenceById(
        parentId,
        Comment,
        "comment you are replying to",
        res
      );

      // create a new comment
      const newComment = new Comment({
        author: author._id,
        body,
      });
      await newComment.save();

      console.log(comment);
      // add new comment into parent comment's children
      comment.children.push(newComment);
      await comment.save();

      const newCommentObject = await newComment.toObject();
      return res.json(newCommentObject);
    } else {
      // check if blog exists
      const blog = await checkExistenceById(blogId, Blog, "blog", res);

      const newComment = new Comment({
        author: author._id,
        body,
        blog: blog._id,
      });
      await newComment.save();
      const newCommentObject = await newComment.toObject();
      return res.json(newCommentObject);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function checkExistenceById(id, Model, name, res) {
  const document = await Model.findById(id).exec();
  if (!document)
    return res.status(404).json({ message: `The ${name} doesn't exist.` });
  return document;
}

module.exports = {
  createComment,
};
