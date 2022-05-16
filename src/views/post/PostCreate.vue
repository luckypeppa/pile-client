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
    <BaseButton @click="createPost">CREATE</BaseButton>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebaseServices";
import firebaseApi from "@/services/firebaseApi";
export default {
  data() {
    return {
      content: "",
      title: "",
      tag: "",
      coverUrl: null,
    };
  },
  components: {
    TipTap,
  },
  methods: {
    async createPost() {
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          title: this.title,
          tag: this.tag,
          content: this.content,
          coverUrl: this.coverUrl,
          createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        this.$router.push({ name: "home" });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
