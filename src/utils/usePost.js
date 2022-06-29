import { reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import postApi from "@/services/post";

export default function () {
  const store = useStore();
  const router = useRouter();

  const post = reactive({
    title: "",
    snippet: "",
    body: "",
    tags: [],
    coverUrl: null,
  });
  const isLoading = ref(false);

  function createPost() {
    if (checkEmpty()) return;
    isLoading.value = true;
    postApi
      .create(post)
      .then(() => {
        store.commit("SET_NOTIFICATION", {
          message: "The post has been created.",
        });
        router.push({ name: "home" });
        isLoading.value = false;
      })
      .catch((err) => {
        store.commit("SET_NOTIFICATION", {
          message: err.response.data.message,
          type: "error",
        });
        isLoading.value = false;
      });
  }

  function updatePost(postId) {
    if (checkEmpty()) return;
    isLoading.value = true;
    postApi
      .updatePost(postId, {
        title: post.title,
        tags: post.tags,
        snippet: post.snippet,
        body: post.body,
        coverUrl: post.coverUrl,
      })
      .then(() => {
        isLoading.value = false;
        store.commit("SET_NOTIFICATION", {
          message: "The post has been updated.",
        });
        store.commit("REMOVE_POST", post._id);
        router.push({ name: "PostDetail" });
      })
      .catch((err) => {
        isLoading.value = false;
        store.commit("SET_NOTIFICATION", {
          message: err.response.data.message,
          type: "error",
        });
      });
  }

  function deletePost(postId) {
    isLoading.value = true;
    postApi
      .deletePost(postId)
      .then(() => {
        isLoading.value = false;
        store.commit("SET_NOTIFICATION", {
          message: "The post has been deleted.",
        });
        router.push({ name: "home" });
      })
      .catch((err) => {
        isLoading.value = false;
        store.commit("SET_NOTIFICATION", {
          message: err.response.data.message,
          type: "error",
        });
      });
  }

  function addCover() {
    post.coverUrl = prompt("Please paste an image url.");

    // const img = e.target.files[0];
    // postApi
    //   .uploadCover(img)
    //   .then((res) => {
    //     post.coverUrl = res.data.imageUrl;
    //   })
    //   .catch((err) =>
    //     store.commit("SET_NOTIFICATION", {
    //       message: err.response.data.message,
    //       type: "error",
    //     })
    //   );
  }

  function addTag(value) {
    post.tags.push(value);
  }

  function removeTag(value) {
    post.tags = post.tags.filter((tag) => tag !== value);
  }

  // check whether or not title, snippet, cover and tag is empty
  function checkEmpty() {
    if (
      !post.title ||
      !post.snippet ||
      !post.coverUrl ||
      !post.tags ||
      !post.body
    ) {
      store.commit("SET_NOTIFICATION", {
        message: "Title, snippet, tag and cover are required.",
        type: "error",
      });
      return true;
    }
    return false;
  }

  return {
    ...toRefs(post),
    isLoading,
    createPost,
    updatePost,
    deletePost,
    addCover,
    addTag,
    removeTag,
  };
}
