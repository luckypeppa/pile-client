<template>
  <div class="container">
    <app-tags></app-tags>
    <div class="posts">
      <post-card v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import AppTags from "@/components/AppTags.vue";
export default {
  components: { PostCard, AppTags },
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
