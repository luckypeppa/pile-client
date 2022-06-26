<template>
  <nav class="navbar">
    <h1>
      <router-link :to="{ name: 'home', params: { language: $i18n.locale } }"
        >PiLE</router-link
      >
    </h1>
    <base-select
      :label="$t('navbar.language.label')"
      :options="$i18n.availableLocales"
      v-model="$i18n.locale"
    ></base-select>
    <router-link :to="{ name: 'home', params: { language: $i18n.locale } }">{{
      $t("navbar.home")
    }}</router-link>
    <router-link
      :to="{ name: 'PostCreate', params: { language: $i18n.locale } }"
      v-if="isAdmin && isLogin"
      data-test-id="navbar-create"
      >{{ $t("navbar.create") }}</router-link
    >
    <router-link
      :to="{ name: 'register', params: { language: $i18n.locale } }"
      v-if="!isLogin"
      data-test-id="navbar-register"
      >{{ $t("navbar.register") }}</router-link
    >
    <router-link
      :to="{ name: 'login', params: { language: $i18n.locale } }"
      v-if="!isLogin"
      data-test-id="navbar-login"
      >{{ $t("navbar.login") }}</router-link
    >
    <BaseButton @click="logout" v-if="isLogin" data-test-id="navbar-logout">{{
      $t("navbar.logout")
    }}</BaseButton>
  </nav>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import authApi from "@/services/auth";
export default {
  name: "appNav",
  methods: {
    logout() {
      authApi
        .logout()
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
    isAdmin() {
      return this.$store.getters.isAdmin;
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
  z-index: 999;

  h1 {
    font-size: 3rem;
    flex: 1;

    &:hover a {
      background: none;
    }
  }
}
</style>
