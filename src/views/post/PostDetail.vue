<template>
  <div class="detail-container">
    <img :src="post.coverUrl" alt="" class="cover" />
    <div class="detail">
      <h1 class="title">{{ post.title }}</h1>
      <p class="tag">{{ post.tag }}</p>
      <time v-if="post.createdAt" class="time">{{
        new Date(this.post.createdAt.seconds * 1000).toString()
      }}</time>
      <div class="content" ref="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate() {
    location.reload();
  },
  computed: {
    post() {
      return this.$store.state.currentPost;
    },
  },
  mounted() {
    this.$refs.content.innerHTML = this.post.content;
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  .cover {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    box-shadow: 0 3px 3px 3px rgba($color: #000000, $alpha: 0.1);
  }
  .detail {
    box-shadow: 0 0 3px 1px rgba($color: #000000, $alpha: 0.1);
    padding: 1rem;
    transform: translateY(-20rem);
    background-color: white;
    width: min(60rem, 100%);
    margin: auto;
    .title,
    .tag {
      margin-bottom: 1rem;
    }

    .time {
      display: block;
      margin-bottom: 2rem;
    }
  }
}
</style>
