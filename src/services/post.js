import axios from "axios";

function getAll() {
  return axios.get(process.env.VUE_APP_POST_URL).then((res) => res.data);
}

function create(post) {
  return axios.post(process.env.VUE_APP_POST_URL, post);
}

export default {
  getAll,
  create,
};
