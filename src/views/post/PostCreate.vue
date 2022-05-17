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
    <TipTap v-model="content" />
    <BaseButton @click="createPost" :isLoading="isLoading">CREATE</BaseButton>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import firebaseApi from "@/services/firebaseApi";
export default {
  data() {
    return {
      content: "",
      title: "",
      tag: "",
      coverUrl: null,
      isLoading: false,
    };
  },
  components: {
    TipTap,
  },
  methods: {
    createPost() {
      this.isLoading = true;
      firebaseApi
        .createPost({
          title: this.title,
          tag: this.tag,
          content: this.content,
          coverUrl: this.coverUrl,
        })
        .then((docRef) => {
          this.$store.commit("SET_NOTIFICATION", "The post has been created.");
          this.$router.push({ name: "home", params: { id: docRef.id } });
          this.isLoading = false;
        })
        .catch((err) => {
          this.$store.commit("SET_NOTIFICATION", err);
          this.isLoading = false;
        });
    },
    addCover(e) {
      this.isLoading = true;
      const file = e.target.files[0];
      firebaseApi
        .uploadImage(file)
        .then((url) => {
          this.coverUrl = url;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$store.commit("SET_NOTIFICATION", err);
          this.isLoading = false;
        });
    },
  },
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
