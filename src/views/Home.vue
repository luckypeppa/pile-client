<template>
  <div class="container">
    <div class="posts">
      <post-card v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  components: { PostCard },
  name: "appHome",
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
};
</script>

<style lang="scss" scoped>
.posts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
</style>
