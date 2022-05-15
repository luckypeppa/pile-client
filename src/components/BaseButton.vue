<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {};
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
  width: 100%;
  cursor: pointer;
}
</style>
