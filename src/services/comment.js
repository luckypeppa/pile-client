import axios from "axios";

function getAllCommentsByBlogId(blogId) {
  return axios.get(process.env.VUE_APP_COMMENT_URL + "/" + blogId);
}

function createComment(comment) {
  return axios.post(process.env.VUE_APP_COMMENT_URL, comment);
}

function deleteComment(commentId) {
  return axios.delete(process.env.VUE_APP_COMMENT_URL + "/" + commentId);
}

function updateComment(commentId, body) {
  return axios.post(process.env.VUE_APP_COMMENT_URL + "/" + commentId, {
    body,
  });
}

export default {
  getAllCommentsByBlogId,
  createComment,
  deleteComment,
  updateComment,
};
