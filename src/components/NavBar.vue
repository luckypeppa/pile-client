<template>
  <nav class="navbar" :class="{ dark: isDark }">
    <h1>
      <router-link :to="{ name: 'home', params: { language: $i18n.locale } }"
        >PiLE</router-link
      >
    </h1>
    <base-checkbox :label="$t('navbar.darkMode')" v-model="isDark" />
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
import { useDark } from "@vueuse/core";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "appNav",
  setup() {
    // set up dark mode
    const isDark = useDark();

    const store = useStore();
    function logout() {
      authApi
        .logout()
        .then(() => {
          store.dispatch("logout");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const isLogin = computed(() => store.getters.isLogin);
    const isAdmin = computed(() => store.getters.isAdmin);

    return { logout, isLogin, isAdmin, isDark };
  },
  components: { BaseButton },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  height: min(7rem, 10vh);
  align-items: center;
  width: 100vw;
  justify-content: flex-end;
  box-shadow: 1px 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  padding: 0 0.2rem;
  z-index: 999;
  background-color: #fff;

  &.dark {
    background-color: rgb(63, 63, 63);
  }

  @media (min-width: 767px) {
    gap: 1rem;
    padding: 0 3rem;
  }

  h1 {
    font-size: clamp(0.7rem, 10vw, 3rem);
    flex: 1;

    &:hover a {
      background: none;
    }
  }
}
</style>
