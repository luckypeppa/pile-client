<template>
  <div class="detail-container">
    <div class="cover-container">
      <div class="tag">{{ post.tag.name }}</div>
      <img :src="post.coverUrl" alt="" class="cover" />
    </div>
    <div class="detail">
      <h1 class="title">{{ post.title }}</h1>
      <p class="tag">{{ post.tag.name }}</p>
      <time v-if="post.createdAt" class="time">{{
        new Date(post.createdAt).toString()
      }}</time>
      <div class="content" ref="body"></div>
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
    this.$refs.body.innerHTML = this.post.body;
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  .cover-container {
    position: relative;
    .tag {
      position: absolute;
      left: 2rem;
      top: 2rem;
      background-color: lightblue;
      padding: 1rem 2rem;
      border-radius: 2rem;
      box-shadow: 0 0 3px 3px rgba($color: #000000, $alpha: 0.1);
    }
    .cover {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      box-shadow: 0 3px 3px 3px rgba($color: #000000, $alpha: 0.1);
    }
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
