<template>
  <div class="detail-container">
    <div class="time-container">
      <time v-if="post.createdAt" class="time">{{
        $d(new Date(post.createdAt), "long", $i18n.locale)
      }}</time>
      <tag-button
        :tag="tag.name"
        v-for="(tag, index) in post.tags"
        :key="index"
        >{{ tag.name }}</tag-button
      >
    </div>
    <div class="cover-container">
      <img :src="post.coverUrl" alt="" class="cover" />
    </div>
    <div class="detail">
      <h1 class="title">{{ post.title }}</h1>
      <!-- <div class="ProseMirror post-body" ref="body"></div> -->
      <editor-content :editor="editor" />
    </div>

    <post-comment width="40rem" :blogId="post._id" />
  </div>
</template>

<script>
import TagButton from "@/components/TagButton.vue";
import PostComment from "@/components/PostComments.vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
export default {
  beforeRouteUpdate() {
    location.reload();
  },
  computed: {
    post() {
      return this.$store.state.currentPost;
    },
    editor() {
      return new Editor({
        editable: false,
        content: this.$store.state.currentPost.body,
        extensions: [StarterKit, Link, Image],
      });
    },
  },
  components: {
    TagButton,
    PostComment,
    EditorContent,
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
