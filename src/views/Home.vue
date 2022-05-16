<template>
  <div class="container">
    <div class="posts">
      <post-card
        v-for="(post, index) in posts"
        :key="index"
        @click="seeDetail(post.id)"
      >
        <h2 class="title">{{ post.title }}</h2>
        <p class="tag">{{ post.tag }}</p>
      </post-card>
    </div>
  </div>
</template>

<script>
import { db } from "@/services/firebaseServices";
import { collection, getDocs } from "firebase/firestore";
import PostCard from "@/components/PostCard.vue";
export default {
  components: { PostCard },
  name: "appHome",
  created() {
    this.$store.commit("REMOVE_POSTS");
    getDocs(collection(db, "posts")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, ...doc.data() };
        this.$store.commit("SET_POST", post);
      });
    });
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    seeDetail(postId) {
      this.$router.push({ name: "PostDetail", params: { id: postId } });
    },
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
