import { createStore } from "vuex";
import axios from "axios";
import postApi from "@/services/post";

export default createStore({
  state: {
    user: null,
    posts: [],
    currentPost: {},
    notification: null,
  },
  getters: {
    isLogin(state) {
      return !!state.user;
    },
    getPost(state) {
      return (id) => {
        const post = state.posts.filter((post) => post._id === id);
        if (post.length > 1) {
          return post[0];
        }

        return postApi.getPost(id);
      };
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      state.user = userData;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.accessToken}`;
    },
    REMOVE_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    REMOVE_POSTS(state) {
      state.posts = [];
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post;
    },
    REMOVE_POST(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    EMPTY_NOTIFICATION(state) {
      state.notification = null;
    },
    SET_NOTIFICATION(state, notication) {
      state.notification = notication;
    },
  },
  actions: {
    login({ commit }, userData) {
      commit("SET_USER_DATA", userData);
    },
    logout({ commit }) {
      commit("REMOVE_USER_DATA");
    },
  },
  modules: {},
});
