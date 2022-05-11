import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    isLogin(state) {
      return !!state.user;
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
    },
    REMOVE_USER_DATA(state) {
      state.user = null;
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
