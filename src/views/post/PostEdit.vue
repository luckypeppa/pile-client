<template>
  <div class="container">
    <post-editor edit />
  </div>
</template>

<script>
import usePost from "@/utils/usePost";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import PostEditor from "@/components/PostEditor.vue";

export default {
  setup() {
    const {
      title,
      snippet,
      body,
      tags,
      coverUrl,
      wholeCoverUrl,
      isLoading,
      updatePost,
      deletePost,
      addCover,
      addTag,
      removeTag,
    } = usePost();

    // get the post to be edited from store
    const store = useStore();
    const post = computed(() => store.state.currentPost);

    // show post content
    onMounted(() => {
      title.value = post.value.title;
      tags.value = post.value.tags.map((tag) => tag.name);
      body.value = post.value.body;
      coverUrl.value = post.value.coverUrl;
      snippet.value = post.value.snippet;
    });

    return {
      title,
      snippet,
      body,
      tags,
      coverUrl,
      wholeCoverUrl,
      isLoading,
      updatePost,
      deletePost,
      addCover,
      post,
      addTag,
      removeTag,
    };
  },
  components: {
    PostEditor,
  },
};
</script>

<style lang="scss" scoped></style>
