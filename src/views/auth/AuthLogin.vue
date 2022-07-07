<template>
  <form @submit.prevent="login" class="user-form">
    <h2>{{ $t("auth.title.login") }}</h2>
    <BaseInput
      v-model="username"
      :label="$t('auth.username')"
      type="text"
      required="true"
      autocomplete="username"
    />
    <BaseInput
      v-model="password"
      :label="$t('auth.password')"
      type="password"
      required="true"
      autocomplete="current-password"
    />
    <BaseButton type="submit" :style="{ width: '100%' }">{{
      $t("auth.buttons.login")
    }}</BaseButton>
    <p class="error" v-if="error">{{ error }}</p>
    <router-link
      :to="{ name: 'register', params: { language: $i18n.locale } }"
      >{{ $t("auth.buttons.register") }}</router-link
    >
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

      axios
        .post(process.env.VUE_APP_BASE_URL + "auth/login", {
          username: username.value,
          password: password.value,
        })
        .then((res) => {
          store.dispatch("login", res.data);
          router.push({ name: "home" });
          isLoading.value = false;
        })
        .catch((err) => {
          error.value = err.response.data.message;
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
