<template>
  <button @click="onClick">
    <div class="loading" v-if="isLoading"></div>
    <slot v-else></slot>
  </button>
</template>

<script>
import { gsap } from "gsap";
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    gsap.to(".loading", {
      rotate: 360,
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    });
  },
  updated() {
    gsap.to(".loading", {
      rotate: 360,
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    });
  },
};
</script>

<style lang="scss" scoped>
button {
  background-color: RGB(253, 200, 133);
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 0.7rem;
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  .loading {
    width: 1.5rem;
    height: 1.5rem;
    background-color: transparent;
    border-left: 2px solid white;
    border-top: 2px solid transparent;
    border-right: 2px solid white;
    border-bottom: 2px solid transparent;
    border-radius: 50%;
  }
}
</style>
