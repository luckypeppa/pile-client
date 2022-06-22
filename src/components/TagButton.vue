<template>
  <div class="tag">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tag {
  color: grey;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    width: 0.3rem;
    height: 0.3rem;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    left: -1rem;
    top: 50%;
    transform: translateY(-100%);
  }
}
</style>
