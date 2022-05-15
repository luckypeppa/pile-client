<template>
  <form @submit.prevent="login" class="user-form">
    <BaseInput v-model="email" label="Email" type="email" required="true" />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      required="true"
    />
    <BaseButton type="submit">Login</BaseButton>
    <p class="error">{{ error }}</p>
    <router-link :to="{ name: 'register' }">Register</router-link>
  </form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "userLogin",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      isLoading: false,
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$store.dispatch("login", userCredential.user);
          this.$router.push({ name: "home" });
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
  components: { BaseButton },
};
</script>

<style lang="scss" scoped>
.user-form {
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
}
</style>
