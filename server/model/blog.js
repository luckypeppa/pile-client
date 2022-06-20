const mongoose = require("mongoose");
const tagSchema = require("./tag");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    tag: tagSchema,
  },
  { timestamps: true }
);

// create Blog model.
// 'blog' responds to the collection name in the database
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
