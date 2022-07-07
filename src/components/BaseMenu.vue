<template>
  <div class="menu-container">
    <slot name="activator" :onClick="toggleMenu" />
    <div v-if="isMenuOpen" class="menu">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isMenuOpen = ref(false);

function toggleMenu() {
  console.log("first");
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style lang="scss" scoped>
html.dark {
  .menu-container {
    .menu {
      background-color: rgb(63, 63, 63);
    }
  }
}

.menu-container {
  cursor: pointer;
  position: relative;

  .menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
  }
}
</style>
