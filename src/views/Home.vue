<template>
  <div class="container">
    <div class="search-container">
      <base-input
        :label="$t('home.search.label')"
        v-model="searchInput"
        prependIcon="fa-solid fa-magnifying-glass"
        outlined
      ></base-input>
    </div>
    <app-tags></app-tags>
    <p>{{ $t("navbar.home") }}</p>
    <h1>{{ $t("home.welcome") }}</h1>
    <div class="posts">
      <post-card v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import AppTags from "@/components/AppTags.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import postApi from "@/services/post";
import usePromise from "@/utils/usePromise";
export default {
  components: { PostCard, AppTags },
  name: "appHome",
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.posts);

    // search posts
    const searchInput = ref("");
    const getBlogs = usePromise((searchInput) =>
      postApi.searchPosts(searchInput.value)
    );

    watch(searchInput, () => {
      if (searchInput.value !== "") {
        getBlogs.createPromise(searchInput).then(() => {
          store.commit("SET_POSTS", getBlogs.results.value.data);
        });
      } else {
        postApi.getAll().then((res) => {
          store.commit("SET_POSTS", res.data);
        });
      }
    });

    return { searchInput, posts };
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  place-content: center;
  margin-bottom: 2rem;
}

p,
h1 {
  text-align: center;
}

p {
  font-weight: 900;
  margin-bottom: 2rem;
}

h1 {
  margin-bottom: 2rem;
  font-size: clamp(1.7rem, 5vw, 5rem);
}

.posts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
</style>
