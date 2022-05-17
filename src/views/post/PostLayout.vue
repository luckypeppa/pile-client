<template>
  <div class="container">
    <div class="links">
      <router-link :to="{ name: 'PostDetail' }">Post Detail</router-link>
      <router-link :to="{ name: 'PostEdit' }">Edit Post</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
