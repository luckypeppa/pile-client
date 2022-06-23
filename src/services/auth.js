import axios from "axios";

function getNewAccessToken(refreshToken) {
  return axios
    .post(process.env.VUE_APP_ACCESS_TOKEN_URL, { refreshToken })
    .then((res) => {
      return res.data.accessToken;
    });
}

function logout() {
  return axios.delete(process.env.VUE_APP_USER_LOGIN_URL);
}

export default {
  getNewAccessToken,
  logout,
};
