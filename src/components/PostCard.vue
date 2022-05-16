<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
  padding: 1rem;
  display: grid;
  gap: 1rem;
  cursor: pointer;
}
</style>
