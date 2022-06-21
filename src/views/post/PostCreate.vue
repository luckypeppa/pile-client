<template>
  <div class="container">
    <div class="create-container">
      <div class="info">
        <BaseInput type="text" label="Title" v-model="title" />
        <BaseInput type="text" label="Tag" v-model="tag" />
        <BaseInput type="text" label="Snippet" v-model="snippet" />
        <base-input type="file" label="Add Cover" @change="addCover" />
      </div>
      <img :src="coverUrl" v-if="coverUrl" alt="" class="preview" />
      <TipTap v-model="body" />
      <BaseButton @click="createPost" :isLoading="isLoading">CREATE</BaseButton>
    </div>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import { reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import postApi from "@/services/post";
export default {
  setup() {
    const store = useStore();

    const post = reactive({
      title: "",
      snippet: "",
      body: "",
      tag: "",
      coverUrl: null,
    });
    const isLoading = ref(false);

    function createPost() {
      isLoading.value = true;
      postApi
        .create(post)
        .then(() => {
          store.commit("SET_NOTIFICATION", "The post has been created.");
          isLoading.value = false;
        })
        .catch((err) => {
          store.commit("SET_NOTIFICATION", err.response.data);
          isLoading.value = false;
        });
    }

    function addCover(e) {
      const img = e.target.files[0];
      postApi
        .uploadCover(img)
        .then((res) => {
          post.coverUrl = process.env.VUE_APP_BASE_URL + res.data.imageUrl;
        })
        .catch((err) => console.log("err:", err));
    }

    return { ...toRefs(post), isLoading, createPost, addCover };
  },
  components: {
    TipTap,
  },
};
</script>

<style lang="scss" scoped>
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
