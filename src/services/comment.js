import axios from "axios";

function getAllCommentsByBlogId(blogId) {
  return axios.get(process.env.VUE_APP_COMMENT_URL + "/" + blogId);
}

function createComment(comment) {
  return axios.post(process.env.VUE_APP_COMMENT_URL, comment);
}

function deleteComment() {}

export default {
  getAllCommentsByBlogId,
  createComment,
  deleteComment,
};
