import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import axios from "axios";
import { h } from "vue";
import authApi from "@/services/auth";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

let isRefreshing = false;

const app = createApp({
  created() {
    const userString = localStorage.getItem("user");

    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const {
          config,
          response: { status, data },
        } = error;

        if (status === 401) {
          this.$store.dispatch("logout");
        }
        if (status === 403 && data === "Access Token has expired.") {
          // get new access token
          if (!isRefreshing) {
            isRefreshing = true;
            authApi
              .getNewAccessToken(store.state.user.refreshToken)
              .then((accessToken) => {
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${accessToken}`;
                isRefreshing = false;
                return axios({
                  ...config,
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                });
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
        }
        return Promise.reject(error);
      }
    );
  },
  render: () => h(App),
})
  .use(store)
  .use(router);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app.mount("#app");
