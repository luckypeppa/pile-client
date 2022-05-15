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
body {
  box-sizing: content-box;
  padding: 0;
  margin: 0;
  border: 0;
  overflow-x: hidden;
}
</style>
