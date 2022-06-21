<template>
  <div class="container">
    <app-tags></app-tags>
    <p>Home</p>
    <h1>Hello, I am Pipi.</h1>
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
p,
h1 {
  text-align: center;
}

p {
  font-weight: 900;
  margin-bottom: 2rem;
}

h1 {
  margin-bottom: 2rem;
  font-size: clamp(1.7rem, 5vw, 5rem);
}

.posts {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
