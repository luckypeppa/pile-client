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
export default {
  name: "appNav",
  methods: {
    logout() {
      this.$store.dispatch("logout");
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
}
</style>
