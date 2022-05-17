<template>
  <div class="container not-found">
    <h1>Can Not Found What You Are Looking For.</h1>
    <p>The {{ resource }} can not be found.</p>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: "page",
    },
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;

  h1 {
    margin-top: 30vh;
  }

  p {
    margin-top: 2rem;
  }
}
</style>
