<template>
  <nav class="nav">
    <router-link :to="{ name: 'register' }" v-if="!isLogin"
      >Register</router-link
    >
    <router-link :to="{ name: 'login' }" v-if="!isLogin">Login</router-link>
    <button @click="logout" v-if="isLogin">Logout</button>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "appNav",
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.dispatch("logout");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 1rem;
  position: fixed;
  background-color: transparent;
}
</style>
