const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// specify the transform schema option
if (!commentSchema.options.toObject) commentSchema.options.toObject = {};
commentSchema.options.toObject.transform = async function (doc, ret) {
  await doc.populate("author", "username");
  await doc.populate("children");
  ret = doc;
  return ret;
};

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
