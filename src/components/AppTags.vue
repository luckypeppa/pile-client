<template>
  <div class="tags">
    <tag-button>test</tag-button>
    <tag-button>javascript</tag-button>
    <button @click="getPostsByTag">test</button>
    <button @click="getPostsByTag">javascript</button>
  </div>
</template>

<script>
import firebaseApi from "@/services/firebaseApi";
import TagButton from "@/components/TagButton.vue";
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
          this.$store.commit("SET_NOTIFICATION", {
            message: err,
            type: "error",
          });
        });
    },
  },
  components: {
    TagButton,
  },
};
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  gap: 2rem;
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
