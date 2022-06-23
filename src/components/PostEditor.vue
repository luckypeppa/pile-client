<template>
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
    <img :src="wholeCoverUrl" v-if="coverUrl" alt="" class="preview" />
    <tag-input
      :tags="tags"
      @add:tag="addTag"
      @remove:tag="removeTag"
    ></tag-input>
    <TipTap v-model="body" />
    <BaseButton @click="createPost" v-if="!edit" :isLoading="isLoading"
      >CREATE</BaseButton
    >
    <BaseButton @click="updatePost(post._id)" v-if="edit" :isLoading="isLoading"
      >UPDATE</BaseButton
    >
    <BaseButton @click="deletePost(post._id)" v-if="edit" :isLoading="isLoading"
      >DELETE</BaseButton
    >
  </div>
</template>

<script>
import TipTap from "@/components/TipTap.vue";
import TagInput from "@/components/TagInput";
import usePost from "@/utils/usePost";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {
      title,
      snippet,
      body,
      tags,
      coverUrl,
      wholeCoverUrl,
      isLoading,
      createPost,
      updatePost,
      deletePost,
      addCover,
      addTag,
      removeTag,
    } = usePost();

    const store = useStore();
    if (props.edit) {
      // get the post to be edited from store
      const post = computed(() => store.state.currentPost);

      // show post content
      onMounted(() => {
        title.value = post.value.title;
        tags.value = post.value.tags.map((tag) => tag.name);
        body.value = post.value.body;
        coverUrl.value = post.value.coverUrl;
        snippet.value = post.value.snippet;
      });
    }

    return {
      title,
      snippet,
      body,
      tags,
      coverUrl,
      wholeCoverUrl,
      isLoading,
      createPost,
      updatePost,
      deletePost,
      addCover,
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

<style lang="scss">
.create-container {
  border: 1px solid black;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 0 3px 5px rgba($color: hsl(0, 0%, 87%), $alpha: 0.3);

  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .preview {
    width: min(100%, 30rem);
    aspect-ratio: 4/ 3;
    object-fit: cover;
    display: block;
    margin: 1rem auto;
  }
}
</style>
