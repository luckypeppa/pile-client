<template>
  <div class="container">
    <div class="info">
      <BaseInput type="text" label="Title" v-model="title" />
      <BaseInput type="text" label="Tag" v-model="tag" />
    </div>
    <div class="add-cover">
      <base-input type="file" label="Add Cover" @change="addCover" />
    </div>
    <TipTap v-model="content" />
    <BaseButton @click="updatePost">UPDATE</BaseButton>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebaseServices";
import firebaseApi from "@/services/firebaseApi";
export default {
  data() {
    return {
      title: "",
      tag: "",
      content: "",
      coverUrl: null,
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
      updateDoc(doc(db, "posts", this.post.id), {
        title: this.title,
        tag: this.tag,
        content: this.content,
        coverUrl: this.coverUrl,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          console.log("updated");
          this.$store.commit("REMOVE_POST", this.post.id);
          this.$router.push({ name: "PostDetail" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  addCover(e) {
    const file = e.target.files[0];
    firebaseApi
      .uploadImage(file)
      .then((url) => {
        this.coverUrl = url;
      })
      .catch((err) => alert(err));
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
}
</style>
