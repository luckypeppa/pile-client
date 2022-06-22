<template>
  <nav class="navbar">
    <h1><router-link :to="{ name: 'home' }">PiLE</router-link></h1>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'PostCreate' }" v-if="isLogin"
      >Create</router-link
    >
    <router-link :to="{ name: 'register' }" v-if="!isLogin"
      >Register</router-link
    >
    <router-link :to="{ name: 'login' }" v-if="!isLogin">Login</router-link>
    <BaseButton @click="logout" v-if="isLogin">Logout</BaseButton>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import BaseButton from "./BaseButton.vue";
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
  components: { BaseButton },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  gap: 1rem;
  position: fixed;
  top: 0;
  background-color: white;
  height: min(5rem, 10vh);
  align-items: center;
  padding: 0 3rem;
  width: 100vw;
  justify-content: flex-end;
  box-shadow: 1px 0 1px 1px rgba($color: #000000, $alpha: 0.1);

  h1 {
    font-size: 3rem;
    flex: 1;

    &:hover a {
      background: none;
    }
  }
}
</style>
