import { createStore } from "vuex";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseServices";
export default createStore({
  state: {
    user: null,
    posts: [],
    currentPost: {},
    notification: "",
  },
  getters: {
    isLogin(state) {
      return !!state.user;
    },
    getPost(state) {
      return (id) => {
        const post = state.posts.filter((post) => post.id === id);
        if (post.length > 1) {
          return post[0];
        }

        return getDoc(doc(db, "posts", id)).then((docSnap) => {
          if (docSnap.exists()) {
            return { id, ...docSnap.data() };
          } else {
            throw 404;
          }
        });
      };
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
    },
    REMOVE_USER_DATA(state) {
      state.user = null;
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
      state.notification = "";
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
