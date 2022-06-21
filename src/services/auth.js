import axios from "axios";

function getNewAccessToken(refreshToken) {
  return axios
    .post(process.env.VUE_APP_ACCESS_TOKEN_URL, { refreshToken })
    .then((res) => {
      return res.data.accessToken;
    });
}

export default {
  getNewAccessToken,
};
