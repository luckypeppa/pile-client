import { createStore } from "vuex";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/main";
export default createStore({
  state: {
    user: null,
    posts: [],
  },
  getters: {
    isLogin(state) {
      return !!state.user;
    },
    getPost(state) {
      return (id) => {
        const post = state.posts.filter((post) => post.id === id);
        console.log(post);
        if (post.length > 1) {
          return post[0];
        }

        return getDoc(doc(db, "posts", id)).then((docSnap) => {
          if (docSnap.exists()) {
            return { id, ...docSnap.data() };
          } else {
            throw "No such document";
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
    SET_POST(state, post) {
      state.posts.push(post);
    },
    REMOVE_POSTS(state) {
      state.posts = [];
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
