<template>
  <section class="comments-container" :style="{ width: width }">
    <header class="header" v-if="hasComments">
      <h2 class="title">
        {{ $t("postComments.title") }}
        <span class="badge">{{ numOfComments }}</span>
      </h2>
    </header>
    <div class="comments">
      <no-comments v-if="!hasComments" />
      <comment-input :blogId="blogId" />
      <comment-card
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
    </div>
  </section>
</template>

<script>
import NoComments from "@/elements/NoComments.vue";
import CommentCard from "@/elements/CommentCard.vue";
import CommentInput from "@/components/CommentInput.vue";
import { computed, onMounted } from "vue";
import commentApi from "@/services/comment";
import { useStore } from "vuex";
export default {
  props: {
    width: {
      type: String,
    },
    blogId: {
      type: String,
      required: true,
    },
  },
  components: {
    NoComments,
    CommentCard,
    CommentInput,
  },
  setup(props) {
    const store = useStore();

    const comments = computed(() => store.state.currentComments);

    const hasComments = computed(() => comments.value.length !== 0);
    // get total number of comments
    const numOfComments = computed(() => {
      const initialValue = comments.value.length;
      const sum = comments.value.reduce(
        (previousValue, comment) => previousValue + comment.children?.length,
        initialValue
      );
      return sum;
    });

    onMounted(() => {
      commentApi
        .getAllCommentsByBlogId(props.blogId)
        .then((res) => {
          store.commit("SET_CURRENT_COMMENTS", res.data);
        })
        .catch((err) => {
          store.commit("SET_NOTIFICATION", {
            message: err.response.data.message,
            type: "error",
          });
        });
    });

    return {
      comments,
      hasComments,
      numOfComments,
    };
  },
};
</script>

<style lang="scss" scoped>
.comments-container {
  margin-top: 5rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 2rem;
  margin-inline: auto;

  .header {
    margin-bottom: 1rem;

    .title {
      position: relative;
      display: inline;
      .badge {
        position: absolute;
        left: 105%;
        top: -10%;
        background-color: rgb(187, 187, 187);
        font-size: 1rem;
        color: #fff;
        padding: 0.1rem 0.3rem;
        border-radius: 0.8rem;
      }
    }
  }
}
</style>
