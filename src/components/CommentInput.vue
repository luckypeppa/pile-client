<template>
  <div class="inputer-container">
    <textarea name="" id="" cols="30" rows="5" class="inputer" v-model="body" />
    <div class="actions">
      <p v-if="replyToUser" class="reply-to">
        {{ "Reply to " + replyToUser.username }}
      </p>
      <div class="buttons">
        <base-button @click="createComment">Send</base-button>
        <!-- <base-button>Update</base-button> -->
        <!-- <base-button>Delete</base-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import commentApi from "@/services/comment";
import { useStore } from "vuex";
export default {
  props: {
    replyToUser: {
      type: Object,
    },
    parentId: {
      type: String,
    },
    blogId: {
      type: String,
    },
  },
  emits: ["close:inputer"],
  setup(props, context) {
    const store = useStore();

    const body = ref("");

    function createComment() {
      commentApi
        .createComment({
          blogId: props.blogId,
          body: body.value,
          parentId: props.parentId,
          authorId: store.state.user._id,
          replyToId: props.replyToUser?._id,
        })
        .then((res) => {
          console.log(res.data);
          store.commit("ADD_CURRENT_COMMENT", res.data);
          store.commit("SET_NOTIFICATION", {
            message: "You have posted a comment.",
          });
          body.value = "";
          context.emit("close:inputer");
        })
        .catch((err) => {
          console.log(err);
          store.commit("SET_NOTIFICATION", {
            message: err.response.data.message,
            type: "error",
          });
        });
    }

    return { body, createComment };
  },
};
</script>

<style lang="scss" scoped>
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
    justify-content: space-between;
    gap: 2rem;
  }

  &:focus-within {
    border: 1px solid #add8e6;
    box-shadow: 0px 0px 20px -1px rgba(173, 216, 230, 0.48);
  }
}
</style>
