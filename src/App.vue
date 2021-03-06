<template>
  <app-notification />
  <NavBar></NavBar>
  <router-view v-slot="{ Component }">
    <transition name="fade-out" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AppNotification from "@/components/AppNotification.vue";
import { useTitle, useFavicon } from "@vueuse/core";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
export default {
  components: {
    NavBar,
    AppNotification,
  },
  setup() {
    const route = useRoute();

    // set the title for every page
    const { t } = useI18n();
    const title = computed(() => t(`meta.titles.${route.name}`));
    useTitle(title, { titleTemplate: "%s | PiLE" });

    // set icon for website
    const icon = useFavicon();
    icon.value = "icon.jpg";
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: 0;
}

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap");

html {
  font-family: "Noto Sans SC", sans-serif;
  font-family: "Roboto", sans-serif;

  &.dark {
    body {
      background-color: rgb(63, 63, 63);
      color: white;

      a {
        color: white;
      }
    }
  }
}

body {
  overflow-x: hidden;
  background-color: white;
  color: black;

  a {
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 1rem;

    &:hover {
      color: lightskyblue;
      background-color: darkblue;
    }
  }

  .container {
    width: min(100%, 60rem);
    margin: 0 auto;
    margin-top: 2rem;
    padding-inline: 0.5rem;
    padding-bottom: 10rem;

    @media (min-width: 767px) {
      padding-inline: 2rem;
    }
  }
}

// animation
.fade-out-enter-from {
  opacity: 0;
}

.fade-out-leave-to {
  opacity: 0;
}

.fade-out-enter-active,
.fade-out-leave-active {
  transition: all 200ms ease-in-out;
}

/* Basic editor styles */
.ProseMirror {
  margin-bottom: 1rem;
  min-height: 10rem;
  padding: 2rem;
  outline: none;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: black;
    color: #fff;
  }

  pre {
    background: #343434;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  a {
    background-color: none;
    color: blue;
    text-decoration: underline;
    padding: 0;

    &:hover {
      background-color: none;
      padding: 0;
      border-radius: 0;
    }
  }
}
</style>
