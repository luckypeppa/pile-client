import axios from "axios";

function getComments() {}

function createComment(comment) {
  return axios.post(process.env.VUE_APP_COMMENT_URL, comment);
}

function deleteComment() {}

export default {
  getComments,
  createComment,
  deleteComment,
};
