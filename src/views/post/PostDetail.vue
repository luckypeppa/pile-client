<template>
  <div>
    <h1 class="title">{{ post.title }}</h1>
    <p class="tag">{{ post.tag }}</p>
    <div class="content">{{ post.content }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    const getPost = this.$store.getters.getPost;
    getPost(this.id)
      .then((post) => (this.post = post))
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped></style>
