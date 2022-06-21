import axios from "axios";

function getAll() {
  console.log(process.env.VUE_APP_POST_URL);
  return axios.get(process.env.VUE_APP_POST_URL).then((res) => res.data);
}

export default {
  getAll,
};
