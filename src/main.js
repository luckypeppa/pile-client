import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import axios from "axios";
import { h } from "vue";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

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
        console.log(error);
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }

        if (
          error.response.status === 403 &&
          error.response.data === "Access Token has expired."
        ) {
          // get new access token
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
