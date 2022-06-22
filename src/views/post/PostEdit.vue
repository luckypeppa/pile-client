<template>
  <div class="create-container">
    <div class="info">
      <BaseInput type="text" label="Title" v-model="title" />
      <BaseInput type="text" label="Tag" v-model="tag" />
      <BaseInput type="text" label="Snippet" v-model="snippet" />
      <base-input type="file" label="Add Cover" @change="addCover" />
    </div>
    <img :src="coverUrl" v-if="coverUrl" alt="" class="preview" />
    <TipTap v-model="body" />
    <div class="buttons">
      <BaseButton @click="updatePost" :isLoading="isLoading">UPDATE</BaseButton>
      <BaseButton @click="deletePost" :isLoading="isLoading">DELETE</BaseButton>
    </div>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import usePost from "@/utils/usePost";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const {
      title,
      snippet,
      body,
      tag,
      coverUrl,
      isLoading,
      updatePost,
      deletePost,
      addCover,
    } = usePost();

    // get the post to be edited from store
    const store = useStore();
    const post = computed(() => store.state.currentPost);

    // show post content
    onMounted(() => {
      title.value = post.value.title;
      tag.value = post.value.tag.name;
      body.value = post.value.body;
      coverUrl.value = post.value.coverUrl;
      snippet.value = post.value.snippet;
    });

    return {
      title,
      snippet,
      body,
      tag,
      coverUrl,
      isLoading,
      updatePost,
      deletePost,
      addCover,
      post,
    };
  },
  components: {
    TipTap,
  },
};
</script>

<style lang="scss" scoped></style>
