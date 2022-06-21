<template>
  <div class="detail-container">
    <div class="time-container">
      <time v-if="post.createdAt" class="time">{{
        new Date(post.createdAt).toString()
      }}</time>
      <div class="tag">{{ post.tag.name }}</div>
    </div>
    <div class="cover-container">
      <img :src="post.coverUrl" alt="" class="cover" />
    </div>
    <div class="detail">
      <h1 class="title">{{ post.title }}</h1>
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
  .time-container {
    display: flex;
    gap: 2rem;
    align-items: center;
    margin-bottom: 1rem;

    .time {
      color: grey;
      display: block;
    }

    .tag {
      color: grey;
      position: relative;

      &::before {
        content: "";
        width: 0.3rem;
        height: 0.3rem;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        left: -1rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .cover {
    display: block;
    width: min(100%, 40rem);
    aspect-ratio: 2 / 1;
    object-fit: cover;
    margin: 2rem auto;
  }
}
.detail {
  padding: 1rem;
  width: min(60rem, 100%);
  margin: auto;
  .title {
    margin-bottom: 2rem;
    text-align: center;
    font-size: clamp(2rem, 7vw, 5rem);
  }
}
</style>
