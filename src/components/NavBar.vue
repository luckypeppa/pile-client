<template>
  <nav class="navbar">
    <h1>
      <router-link :to="{ name: 'home', params: { language: $i18n.locale } }"
        >PiLE</router-link
      >
    </h1>
    <nav-actions v-if="!mdAndSmaller" />
    <base-menu v-if="mdAndSmaller">
      <template v-slot:activator="{ onClick }">
        <font-awesome-icon
          icon="fa-solid fa-bars"
          @click="onClick"
          class="menu-icon"
        />
      </template>
      <div class="menu-list">
        <nav-actions />
      </div>
    </base-menu>
  </nav>
</template>

<script>
import NavActions from "../elements/NavActions.vue";
import { useDark, breakpointsTailwind, useBreakpoints } from "@vueuse/core";
export default {
  name: "appNav",
  components: { NavActions },
  setup() {
    // set up dark mode
    const isDark = useDark();

    // set up breakpoints
    const breakpoints = useBreakpoints(breakpointsTailwind);

    const mdAndSmaller = breakpoints.smaller("md");

    return { isDark, mdAndSmaller };
  },
};
</script>

<style lang="scss" scoped>
html.dark {
  .navbar {
    background-color: rgb(63, 63, 63);
  }
}

.navbar {
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  align-items: center;
  width: 100vw;
  justify-content: flex-end;
  box-shadow: 1px 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  padding: 0 0.2rem;
  z-index: 999;
  background-color: #fff;

  @media (min-width: 367px) {
    gap: 1rem;
    padding: 0 3rem;
  }

  .menu-icon {
    font-size: 2rem;
  }

  .menu-list {
    width: max-content;
    border: 1px solid lightgray;
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
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
