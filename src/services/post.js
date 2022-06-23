import axios from "axios";

function getAll() {
  return axios.get(process.env.VUE_APP_POST_URL);
}

function create(post) {
  return axios.post(process.env.VUE_APP_POST_URL, post);
}

function uploadCover(img) {
  return axios.postForm(process.env.VUE_APP_IMAGE_POST_URL, {
    file: img,
  });
}

function getPost(postId) {
  return axios.get(process.env.VUE_APP_POST_URL + "/" + postId);
}

function updatePost(postId, post) {
  return axios.post(process.env.VUE_APP_POST_URL + "/" + postId, post);
}

function deletePost(postId) {
  return axios.delete(process.env.VUE_APP_POST_URL + "/" + postId);
}

function getPostsByTag(tag) {
  return axios.get(process.env.VUE_APP_GET_POST_BY_TAG_URL + "/" + tag);
}

function getAllTags() {
  return axios.get(process.env.VUE_APP_GET_POST_BY_TAG_URL);
}

export default {
  getAll,
  create,
  uploadCover,
  getPost,
  updatePost,
  deletePost,
  getPostsByTag,
  getAllTags,
};
