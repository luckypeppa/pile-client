<template>
  <div class="container">
    <div class="links">
      <router-link :to="{ name: 'PostDetail' }">Post Detail</router-link>
      <router-link :to="{ name: 'PostEdit' }">Edit Post</router-link>
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
};
</script>

<style lang="scss" scoped></style>
