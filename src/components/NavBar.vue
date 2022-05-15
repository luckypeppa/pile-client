<template>
  <nav class="navbar">
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
.navbar {
  display: flex;
  gap: 1rem;
  position: fixed;
  background-color: transparent;
  height: min(5rem, 10vh);
  align-items: center;
  padding: 0 3rem;
  width: 100vw;
  justify-content: flex-end;
}
</style>
