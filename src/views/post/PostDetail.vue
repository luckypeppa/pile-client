<template>
  <div class="detail-container">
    <div class="time-container">
      <time v-if="post.createdAt" class="time">{{
        new Date(post.createdAt).toString()
      }}</time>
      <tag-button
        :tag="tag.name"
        v-for="(tag, index) in post.tags"
        :key="index"
        >{{ tag.name }}</tag-button
      >
    </div>
    <div class="cover-container">
      <img :src="wholeCoverUrl" alt="" class="cover" />
    </div>
    <div class="detail">
      <h1 class="title">{{ post.title }}</h1>
      <div class="ProseMirror post-body" ref="body"></div>
    </div>

    <post-comment width="40rem" :blogId="post._id" />
  </div>
</template>

<script>
import TagButton from "@/components/TagButton.vue";
import PostComment from "@/components/PostComments.vue";
export default {
  beforeRouteUpdate() {
    location.reload();
  },
  computed: {
    post() {
      return this.$store.state.currentPost;
    },
    wholeCoverUrl() {
      return process.env.VUE_APP_BASE_URL + this.post.coverUrl;
    },
  },
  mounted() {
    this.$refs.body.innerHTML = this.post.body;
  },
  components: {
    TagButton,
    PostComment,
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
