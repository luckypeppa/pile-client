<template>
  <div>
    <div class="info">
      <BaseInput type="text" label="Title" v-model="title" />
      <BaseInput type="text" label="Tag" v-model="tag" />
    </div>
    <div class="add-cover">
      <base-input type="file" label="Add Cover" @change="addCover" />
      <img :src="coverUrl" v-if="coverUrl" alt="" class="preview" />
    </div>
    <TipTap v-model="content" />
    <div class="buttons">
      <BaseButton @click="updatePost" :isLoading="isLoading">UPDATE</BaseButton>
      <BaseButton @click="deletePost" :isLoading="isLoading">DELETE</BaseButton>
    </div>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import firebaseApi from "@/services/firebaseApi";
export default {
  data() {
    return {
      title: "",
      tag: "",
      content: "",
      coverUrl: null,
      isLoading: false,
    };
  },
  computed: {
    post() {
      return this.$store.state.currentPost;
    },
  },
  mounted() {
    this.title = this.post.title;
    this.tag = this.post.tag;
    this.content = this.post.content;
    this.coverUrl = this.post.coverUrl;
  },
  components: {
    TipTap,
  },
  methods: {
    updatePost() {
      this.isLoading = true;
      firebaseApi
        .updatePost(this.post.id, {
          title: this.title,
          tag: this.tag,
          content: this.content,
          coverUrl: this.coverUrl,
        })
        .then(() => {
          this.isLoading = false;
          this.$store.commit("SET_NOTIFICATION", "The post has been updated.");
          this.$store.commit("REMOVE_POST", this.post.id);
          this.$router.push({ name: "PostDetail" });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$store.commit("SET_NOTIFICATION", err);
        });
    },
    deletePost() {
      firebaseApi
        .deletePost(this.post.id)
        .then(() => {
          this.isLoading = false;
          this.$store.commit("SET_NOTIFICATION", "The post has been deleted.");
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$store.commit("SET_NOTIFICATION", err);
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

.buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
