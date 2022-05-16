<template>
  <div class="container">
    <div class="posts">
      <div class="card">
        <h2 class="title"></h2>
        <p class="tag"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import { collection, getDocs } from "firebase/firestore";
export default {
  name: "appHome",
  async created() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      this.$store.commit("SET_POST", doc.data());
    });
  },
};
</script>

<style lang="scss" scoped>
.posts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
</style>
