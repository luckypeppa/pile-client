<template>
  <div class="user-container">
    <div class="form-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.user-container {
  width: 100vw;
  min-height: 100vh;
  background-position: center center;

  .form-container {
    width: min(25rem, 100%);
    margin: auto;
    padding-top: 7rem;
  }
}
</style>
