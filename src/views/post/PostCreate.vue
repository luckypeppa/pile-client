<template>
  <div class="container">
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
      <BaseButton @click="createPost" :isLoading="isLoading">CREATE</BaseButton>
    </div>
  </div>
</template>

<script>
import TipTap from "@/components/TipTap.vue";
import TagInput from "@/components/TagInput";
import usePost from "@/utils/usePost";
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
      createPost,
      addCover,
      addTag,
      removeTag,
    } = usePost();

    return {
      title,
      snippet,
      body,
      tags,
      coverUrl,
      wholeCoverUrl,
      isLoading,
      createPost,
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
