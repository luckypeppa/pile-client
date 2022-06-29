<template>
  <div class="post-card" @click="seeDetail(post._id)" data-test-id="postcard">
    <div class="left">
      <h2 class="title">{{ post.title }}</h2>
      <div class="tags">
        <tag-button
          :tag="tag.name"
          v-for="(tag, index) in post.tags"
          :key="index"
          :data-test-id="`postcard-tag-${index}`"
        ></tag-button>
      </div>
      <p class="snippet">{{ post.snippet }}</p>
      <time v-if="post.createdAt">{{
        $d(new Date(post.createdAt), "long", $i18n.locale)
      }}</time>
    </div>
    <div class="cover">
      <img :src="post.coverUrl" alt="" />
    </div>
  </div>
</template>

<script>
import TagButton from "@/components/TagButton.vue";
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
  components: {
    TagButton,
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid black;
  padding: 1rem;
  align-items: center;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 1rem;
    text-align: right;

    & > * {
      font-weight: 800;
    }

    .title {
      font-size: clamp(1.7rem, 5vw, 3rem);
    }

    .tags {
      padding-left: 1rem;
      display: flex;
      gap: 2rem;
      justify-content: flex-end;
    }
  }

  &:nth-child(even) .left {
    order: 2;

    text-align: left;

    & .tags {
      justify-content: flex-start;
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
