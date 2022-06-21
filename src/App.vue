<template>
  <app-notification />
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AppNotification from "@/components/AppNotification.vue";
export default {
  components: {
    NavBar,
    AppNotification,
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

:root {
  --main-bg-color: lightyellow;
}

body {
  overflow-x: hidden;
  background-color: var(--main-bg-color);
  a {
    text-decoration: none;
    font-weight: 600;
  }

  .container {
    width: min(80rem, 100%);
    margin: auto;
    padding-top: 7rem;
    padding-inline: min(3rem, 10vw);
    min-height: 100vh;
  }

  .content {
    margin-bottom: 1rem;
    min-height: 10rem;
    border-radius: 0.5rem;

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
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
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
  }
}
</style>
