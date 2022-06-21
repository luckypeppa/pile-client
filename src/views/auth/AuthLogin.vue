<template>
  <form @submit.prevent="login" class="user-form">
    <h2>LOGIN</h2>
    <BaseInput
      v-model="username"
      label="Username"
      type="text"
      required="true"
    />
    <BaseInput
      v-model="password"
      label="Password"
      type="password"
      required="true"
    />
    <BaseButton type="submit" :style="{ width: '100%' }">Login</BaseButton>
    <p class="error" v-if="error">{{ error }}</p>
    <router-link :to="{ name: 'register' }">Register</router-link>
  </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "userLogin",
  setup() {
    const store = useStore();
    const router = useRouter();

    const username = ref("");
    const password = ref("");
    const error = ref("");
    const isLoading = ref(false);

    function login() {
      isLoading.value = true;
      console.log(process.env.VUE_APP_USER_LOGIN_URL);

      axios
        .post(process.env.VUE_APP_USER_LOGIN_URL, {
          username: username.value,
          password: password.value,
        })
        .then((res) => {
          store.dispatch("login", res.data);
          router.push({ name: "home" });
          isLoading.value = false;
        })
        .catch((err) => {
          error.value = err.message;
        });
    }

    return { username, password, error, isLoading, login };
  },
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
