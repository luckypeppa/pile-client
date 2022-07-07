<template>
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
</template>

<script>
import { useDark } from "@vueuse/core";
import { useStore } from "vuex";
import { computed } from "vue";
import authApi from "@/services/auth";
export default {
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
};
</script>

<style lang="scss" scoped></style>
