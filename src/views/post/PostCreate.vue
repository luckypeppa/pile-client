<template>
  <div class="container">
    <div class="info">
      <BaseInput type="text" label="Title" v-model="title" />
      <BaseInput type="text" label="Tag" v-model="tag" />
    </div>
    <div class="add-cover">
      <base-input type="file" label="Add Cover" @change="addCover" />
      <img :src="coverUrl" v-if="coverUrl" alt="" class="preview" />
    </div>
    <TipTap v-model="body" />
    <BaseButton @click="createPost" :isLoading="isLoading">CREATE</BaseButton>
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

    return { ...toRefs(post), isLoading, createPost };
  },
  components: {
    TipTap,
  },
  // methods: {
  //   addCover(e) {
  //     this.isLoading = true;
  //     const file = e.target.files[0];
  //     firebaseApi
  //       .uploadImage(file)
  //       .then((url) => {
  //         this.coverUrl = url;
  //         this.isLoading = false;
  //       })
  //       .catch((err) => {
  //         this.$store.commit("SET_NOTIFICATION", err);
  //         this.isLoading = false;
  //       });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.add-cover {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 40% 1fr;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  .preview {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
}
</style>
