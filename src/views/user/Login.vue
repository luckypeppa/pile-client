<template>
  <form @submit.prevent="login" class="user-form">
    <BaseInput v-model="email" label="Email" type="email" required="true" />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      required="true"
    />
    <button type="submit">Login</button>
    <p class="error">{{ error }}</p>
    <router-link :to="{ name: 'register' }">Register</router-link>
  </form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "userLogin",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$store.dispatch("login", userCredential.user);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
