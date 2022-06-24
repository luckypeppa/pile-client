<template>
  <div class="skeleton" :style="style">
    <div class="avatar"></div>
    <div class="bars">
      <div class="bar long"></div>
      <div class="bar short"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    style: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton {
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 2px 2px 12px -1px rgba(0, 0, 0, 0.17);

  .avatar {
    width: 2rem;
    height: 2rem;
    border: 2px solid white;
    background-color: rgb(239, 239, 239);
    border-radius: 50%;
    box-shadow: 0 0 0 3px lightpink;
  }

  .bars {
    display: grid;
    gap: 0.5rem;

    .bar {
      width: 5rem;
      height: 0.8rem;
      background-color: rgb(239, 239, 239);
      border-radius: 0.5rem;

      &.long {
        width: 10rem;
      }
    }
  }
}
</style>
