<template>
  <form @submit.prevent="login" class="user-form">
    <h2>LOGIN</h2>
    <BaseInput v-model="email" label="Email" type="email" required="true" />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      required="true"
    />
    <BaseButton type="submit" :style="{ width: '100%' }">Login</BaseButton>
    <p class="error" v-if="error">{{ error }}</p>
    <!-- <router-link :to="{ name: 'register' }">Register</router-link> -->
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

<style lang="scss">
.user-form {
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
}
</style>
