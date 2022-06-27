import axios from "axios";

function getNewAccessToken(refreshToken) {
  return axios
    .post(process.env.VUE_APP_BASE_URL + "auth/token", { refreshToken })
    .then((res) => {
      return res.data.accessToken;
    });
}

function logout() {
  return axios.delete(process.env.VUE_APP_BASE_URL + "auth/login");
}

export default {
  getNewAccessToken,
  logout,
};
