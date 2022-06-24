<template>
  <section class="comments-container" :style="{ width: width }">
    <header class="header" v-if="hasComments">
      <h2 class="title">
        Comments
        <span class="badge">{{ comments.length }}</span>
      </h2>
    </header>
    <div class="comments">
      <no-comments v-if="!hasComments" />
      <div class="inputer-container">
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          class="inputer"
          v-model="body"
        />
        <div class="actions">
          <base-button @click="createComment">Send</base-button>
          <base-button>Update</base-button>
          <base-button>Delete</base-button>
        </div>
      </div>
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
import { ref, reactive, toRefs, computed } from "vue";
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
  },
  setup(props) {
    const store = useStore();

    // const comment = ref("");
    const comment = reactive({
      body: "",
      parentId: "",
    });

    const comments = ref([]);

    const hasComments = computed(() => comments.value.length !== 0);

    function createComment() {
      commentApi
        .createComment({
          blogId: props.blogId,
          body: comment.body,
          parentId: comment.parentId,
          authorId: store.state.user._id,
        })
        .then((res) => {
          console.log(res.data);
          comments.value.push(res.data);
        })
        .catch((err) => {
          console.log(err);
          store.commit("SET_NOTIFICATION", {
            message: err.response.data.message,
            type: "error",
          });
        });
    }

    return { ...toRefs(comment), comments, hasComments, createComment };
  },
};
</script>

<style lang="scss" scoped>
.comments-container {
  margin-top: 5rem;
  background-color: #fff;
  //   box-shadow: 0px 0px 14px -2px rgba(0, 0, 0, 0.17);
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
  .comments {
    .inputer-container {
      border: 1px solid lightgray;
      border-radius: 0.5rem;
      margin-block: 2rem;
      padding-inline: 1rem;
      .inputer {
        display: block;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 0.4rem;
        resize: none;
        padding-block: 1rem;
        font-size: 1rem;
      }

      .actions {
        padding: 0.5rem;
        border-top: 1px solid rgb(233, 233, 233);
        display: flex;
        justify-content: flex-end;
        gap: 2rem;
      }

      &:focus-within {
        border: 1px solid #add8e6;
        box-shadow: 0px 0px 20px -1px rgba(173, 216, 230, 0.48);
      }
    }
  }
}
</style>
