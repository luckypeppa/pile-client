<template>
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
export default {
  components: {
    NavBar,
  },
  created() {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch("login", user);
      } else {
        this.$store.dispatch("logout");
      }
    });
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: 0;
}

body {
  overflow-x: hidden;
  background-color: #f1e6d6;
  a {
    text-decoration: none;
    font-weight: 600;
  }

  .container {
    width: min(60rem, 100%);
    margin: auto;
    padding-top: 5rem;
    padding-inline: min(3rem, 10vw);
    min-height: 100vh;
  }
}
</style>
