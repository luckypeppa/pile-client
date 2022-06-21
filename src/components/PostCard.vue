<template>
  <div class="post-card" @click="seeDetail(post._id)">
    <div class="left">
      <h2 class="title">{{ post.title }}</h2>
      <p class="tag">{{ post.tag.name }}</p>
      <p class="snippet">{{ post.snippet }}</p>
      <time v-if="post.createdAt">{{
        new Date(this.post.createdAt).toString()
      }}</time>
    </div>
    <div class="cover" v-if="post.coverUrl">
      <img :src="post.coverUrl" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    seeDetail(postId) {
      this.$router.push({ name: "PostDetail", params: { id: postId } });
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid black;
  padding: 1rem;
  align-items: center;

  &:nth-child(even) .left {
    order: 2;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 1rem;

    & > * {
      font-weight: 800;
    }

    .title {
      font-size: clamp(1.7rem, 5vw, 3rem);
    }
  }

  .cover {
    width: 100%;
    overflow: hidden;
    box-shadow: 0 0 3px 1px rgba($color: #000000, $alpha: 0.1);

    img {
      width: 100%;
      aspect-ratio: 2 / 1;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
