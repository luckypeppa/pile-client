<template>
  <div class="create-container">
    <div class="create-container">
      <div class="info">
        <BaseInput type="text" label="Title" v-model="title" :required="true" />
        <BaseInput
          type="text"
          label="Snippet"
          v-model="snippet"
          :required="true"
        />
        <base-input
          type="file"
          label="Add Cover"
          @change="addCover"
          :required="true"
        />
      </div>
      <img :src="coverUrl" v-if="coverUrl" alt="" class="preview" />
      <tag-input
        :tags="tags"
        @add:tag="addTag"
        @remove:tag="removeTag"
      ></tag-input>
      <TipTap v-model="body" />
      <BaseButton @click="updatePost(post._id)" :isLoading="isLoading"
        >UPDATE</BaseButton
      >
      <BaseButton @click="deletePost(post._id)" :isLoading="isLoading"
        >DELETE</BaseButton
      >
    </div>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import TagInput from "@/components/TagInput";
import usePost from "@/utils/usePost";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const {
      title,
      snippet,
      body,
      tags,
      coverUrl,
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
    TipTap,
    TagInput,
  },
};
</script>

<style lang="scss" scoped></style>
