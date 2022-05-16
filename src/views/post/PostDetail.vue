<template>
  <div class="container detail">
    <h1 class="title">{{ post.title }}</h1>
    <p class="tag">{{ post.tag }}</p>
    <time v-if="post.createdAt" class="time">{{
      new Date(this.post.createdAt.seconds * 1000).toString()
    }}</time>
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
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
      .then((post) => {
        this.post = post;
        this.$refs.content.innerHTML = this.post.content;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
.detail {
  text-align: center;
  box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);

  .title,
  .tag {
    margin-bottom: 1rem;
  }

  .time {
    display: block;
    margin-bottom: 2rem;
  }
}
</style>
