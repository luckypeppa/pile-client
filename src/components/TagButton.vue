<template>
  <div class="tag" @click="getPostsByTag">
    {{ tag }}
  </div>
</template>

<script>
import postApi from "@/services/post";
import { useStore } from "vuex";
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    function getPostsByTag() {
      if (props.tag === "All") {
        postApi
          .getAll()
          .then((posts) => {
            store.commit("SET_POSTS", posts);
          })
          .catch((err) => {
            store.commit("SET_NOTIFICATION", { message: err, type: "error" });
          });
      } else {
        postApi
          .getPostsByTag(props.tag)
          .then((res) => {
            store.commit("SET_POSTS", res.data);
          })
          .catch((err) =>
            store.commit("SET_NOTIFICATION", { message: err, type: "error" })
          );
      }
    }

    return { getPostsByTag };
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
