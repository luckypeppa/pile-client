import axios from "axios";

function getAllCommentsByBlogId(blogId) {
  return axios.get(process.env.VUE_APP_BASE_URL + "comments/" + blogId);
}

function createComment(comment) {
  return axios.post(process.env.VUE_APP_BASE_URL + "comments", comment);
}

function deleteComment(commentId) {
  return axios.delete(process.env.VUE_APP_BASE_URL + "comments/" + commentId);
}

function updateComment(commentId, body) {
  return axios.post(process.env.VUE_APP_BASE_URL + "comments/" + commentId, {
    body,
  });
}

export default {
  getAllCommentsByBlogId,
  createComment,
  deleteComment,
  updateComment,
};
