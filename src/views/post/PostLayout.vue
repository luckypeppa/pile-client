<template>
  <div class="container">
    <div class="links">
      <router-link
        :to="{ name: 'PostDetail' }"
        v-if="$route.name !== 'PostDetail'"
        >Post Detail</router-link
      >
      <router-link
        :to="{ name: 'PostEdit' }"
        v-if="$route.name !== 'PostEdit' && isLogin"
        >Edit Post</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

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
      .then((res) => {
        store.commit("SET_CURRENT_POST", res.data.blog);
        next();
      })
      .catch((err) => {
        if (err === 404) {
          next({ name: "404", params: { resource: "post" } });
        } else {
          next({ name: "NetworkError" });
        }
      });
  },
  beforeRouteUpdate(to, from, next) {
    const getPost = store.getters.getPost;
    getPost(to.params.id)
      .then((res) => {
        store.commit("SET_CURRENT_POST", res.data.blog);
        next();
      })
      .catch((err) => {
        if (err === 404) {
          next({ name: "404", params: { resource: "post" } });
        } else {
          next({ name: "NetworkError" });
        }
      });
  },
  computed: {
    ...mapGetters(["isLogin"]),
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
