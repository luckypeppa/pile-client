<template>
  <div class="tag" @click.stop="onClick">
    {{ tag }}
  </div>
</template>

<script>
import postApi from "@/services/post";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
    searchByTag: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    function getPostsByTag() {
      if (props.tag === "All") {
        postApi
          .getAll()
          .then((res) => {
            store.commit("SET_POSTS", res.data);
          })
          .catch((err) => {
            store.commit("SET_NOTIFICATION", {
              message: err.response.data.message,
              type: "error",
            });
          });
      } else {
        router.push({ name: "home" });
        postApi
          .getPostsByTag(props.tag)
          .then((res) => {
            store.commit("SET_POSTS", res.data);
          })
          .catch((err) =>
            store.commit("SET_NOTIFICATION", {
              message: err.response.data.message,
              type: "error",
            })
          );
      }
    }

    const onClick = computed(() => (props.searchByTag ? getPostsByTag : null));

    return { getPostsByTag, onClick };
  },
};
</script>

<style lang="scss" scoped>
.tag {
  color: grey;
  position: relative;
  cursor: pointer;
  display: grid;
  place-content: center;
  text-decoration: underline;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    background-color: lightgreen;
    border-radius: 50%;
    position: absolute;
    left: -1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
