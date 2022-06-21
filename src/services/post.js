import axios from "axios";

function getAll() {
  return axios.get(process.env.VUE_APP_POST_URL).then((res) => res.data);
}

function create(post) {
  return axios.post(process.env.VUE_APP_POST_URL, post);
}

function uploadCover(img) {
  return axios.postForm(process.env.VUE_APP_IMAGE_POST_URL, {
    file: img,
  });
}

export default {
  getAll,
  create,
  uploadCover,
};
