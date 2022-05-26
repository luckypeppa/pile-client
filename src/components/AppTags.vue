<template>
  <div class="tags">
    <button @click="getPostsByTag">test</button>
    <button @click="getPostsByTag">javascript</button>
  </div>
</template>

<script>
import firebaseApi from "@/services/firebaseApi";
export default {
  methods: {
    getPostsByTag(e) {
      const tag = e.target.textContent;
      firebaseApi
        .getPosts(tag)
        .then((posts) => {
          this.$store.commit("SET_POSTS", posts);
        })
        .catch((err) => {
          this.$store.commit("SET_NOTIFICATION", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  button {
    background-color: orange;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0 0 1px 1px rgba(100, 100, 100, 0.5);
  }
}
</style>
