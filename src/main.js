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
import i18n from "./i18n";

// fontawesome
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faXmark,
  faMagnifyingGlass,
  faMessage,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faXmark, faMagnifyingGlass, faMessage, faPenToSquare);

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
        console.log(config);

        if (status === 401) {
          this.$store.dispatch("logout");
        }
        if (status === 403 && data === "Access Token has expired.") {
          // get new access token
          if (!isRefreshing) {
            isRefreshing = true;
            return authApi
              .getNewAccessToken(store.state.user.refreshToken)
              .then((accessToken) => {
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${accessToken}`;
                isRefreshing = false;
                console.log("first");
                config.headers.Authorization = `Bearer ${accessToken}`;
                console.log(config);
                return axios(config);
              });
          }
        }
        return Promise.reject(error);
      }
    );
  },
  render: () => h(App),
})
  .use(i18n)
  .use(store)
  .use(router);

// add fontawesome
app.component("font-awesome-icon", FontAwesomeIcon);

// add all components starts with Base

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app.mount("#app");
