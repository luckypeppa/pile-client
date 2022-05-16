<template>
  <div class="container">
    <div class="info">
      <BaseInput type="text" label="Title" v-model="title" />
      <BaseInput type="text" label="Tag" v-model="tag" />
    </div>
    <TipTap v-model="content" />
    <BaseButton @click="createPost">CREATE</BaseButton>
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/services/firebaseServices";
export default {
  data() {
    return {
      content: "",
      title: "",
      tag: "",
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
        });
        console.log("Document written with ID: ", docRef.id);
        this.$router.push({ name: "home" });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
</style>
