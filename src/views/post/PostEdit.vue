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
import postApi from "@/services/post";
export default {
  data() {
    return {
      title: "",
      tag: "",
      body: "",
      coverUrl: null,
      snippet: "",
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
    this.tag = this.post.tag.name;
    this.body = this.post.body;
    this.coverUrl = this.post.coverUrl;
    this.snippet = this.post.snippet;
  },
  components: {
    TipTap,
  },
  methods: {
    updatePost() {
      this.isLoading = true;
      postApi
        .updatePost(this.post._id, {
          title: this.title,
          tag: this.tag,
          snippet: this.snippet,
          body: this.body,
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
      this.isLoading = true;
      postApi
        .deletePost(this.post._id)
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
      const img = e.target.files[0];
      postApi
        .uploadCover(img)
        .then((res) => {
          this.coverUrl = process.env.VUE_APP_BASE_URL + res.data.imageUrl;
        })
        .catch((err) => console.log("err:", err));
    },
  },
};
</script>

<style lang="scss" scoped></style>
