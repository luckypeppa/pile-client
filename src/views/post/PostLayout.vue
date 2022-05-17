<template>
  <div class="container">
    <div class="links">
      <router-link
        :to="{ name: 'PostDetail' }"
        v-if="$route.name !== 'PostDetail'"
        >Post Detail</router-link
      >
      <router-link :to="{ name: 'PostEdit' }" v-if="$route.name !== 'PostEdit'"
        >Edit Post</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from "@/store";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    const getPost = store.getters.getPost;
    getPost(to.params.id)
      .then((post) => {
        store.commit("SET_CURRENT_POST", post);
        next();
      })
      .catch((err) => console.log(err));
  },
  beforeRouteUpdate(to, from, next) {
    const getPost = store.getters.getPost;
    getPost(to.params.id)
      .then((post) => {
        store.commit("SET_CURRENT_POST", post);
        next();
      })
      .catch((err) => console.log(err));
  },
  compued: {
    isDetail() {
      return this.$route.name !== "PostDetial";
    },
  },
};
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
