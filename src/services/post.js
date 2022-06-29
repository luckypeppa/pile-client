import axios from "axios";

function getAll() {
  return axios.get(process.env.VUE_APP_BASE_URL + "blogs");
}

function create(post) {
  return axios.post(process.env.VUE_APP_BASE_URL + "blogs", post);
}

// function uploadCover(img) {
//   return axios.postForm(process.env.VUE_APP_BASE_URL + "blogs/image", {
//     file: img,
//   });
// }

function getPost(postId) {
  return axios.get(process.env.VUE_APP_BASE_URL + "blogs/" + postId);
}

function updatePost(postId, post) {
  return axios.post(process.env.VUE_APP_BASE_URL + "blogs/" + postId, post);
}

function deletePost(postId) {
  return axios.delete(process.env.VUE_APP_BASE_URL + "blogs/" + postId);
}

function getPostsByTag(tag) {
  return axios.get(process.env.VUE_APP_BASE_URL + "blogs/tag/" + tag);
}

function getAllTags() {
  return axios.get(process.env.VUE_APP_BASE_URL + "blogs/tag");
}

function searchPosts(input) {
  return axios.get(process.env.VUE_APP_BASE_URL + "blogs/search/" + input);
}

export default {
  getAll,
  create,
  getPost,
  updatePost,
  deletePost,
  getPostsByTag,
  getAllTags,
  searchPosts,
};
