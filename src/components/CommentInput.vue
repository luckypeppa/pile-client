<template>
  <div class="inputer-container">
    <textarea
      name=""
      id=""
      cols="30"
      rows="5"
      class="inputer"
      v-model="body"
      ref="input"
      :placeholder="$t('resources.comment.placeholder')"
    />
    <div class="actions">
      <p v-if="selectedComment?.replyTo" class="reply-to">
        {{
          $t("commentInputer.replyTo") + " " + selectedComment?.replyTo.username
        }}
      </p>
      <div class="buttons">
        <base-button @click="createComment" v-show="!isEditing">{{
          $t("commentInputer.buttons.send")
        }}</base-button>
        <base-button v-show="isEditing" @click="updateComment">{{
          $t("commentInputer.buttons.update")
        }}</base-button>
        <base-button v-show="isEditing" @click="deleteComment">{{
          $t("commentInputer.buttons.delete")
        }}</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import commentApi from "@/services/comment";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
export default {
  props: {
    parentId: {
      type: String,
    },
    blogId: {
      type: String,
    },
    selectedComment: {
      type: Object,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close:inputer"],
  setup(props, context) {
    const store = useStore();
    const { t } = useI18n();

    const body = ref(props.isEditing ? props.selectedComment?.body : "");

    function createComment() {
      commentApi
        .createComment({
          blogId: props.blogId,
          body: body.value,
          parentId: props.parentId,
          authorId: store.state.user._id,
          replyToId: props.selectedComment?.author._id,
        })
        .then((res) => {
          store.commit("ADD_CURRENT_COMMENT", res.data);
          store.commit("SET_NOTIFICATION", {
            message: t("resources.comment.created"),
          });
          body.value = "";
          context.emit("close:inputer");
        })
        .catch((err) => {
          store.commit("SET_NOTIFICATION", {
            message: err.response.data.message,
            type: "error",
          });
        });
    }

    function deleteComment() {
      commentApi
        .deleteComment(props.selectedComment._id)
        .then(() => {
          store.commit("REMOVE_CURRENT_COMMENT", props.selectedComment._id);
          store.commit("SET_NOTIFICATION", {
            message: t("resources.comment.deleted"),
          });
          context.emit("close:inputer");
        })
        .catch((err) => {
          store.commit("SET_NOTIFICATION", {
            message: err.response.data.message,
            type: "error",
          });
        });
    }

    function updateComment() {
      commentApi
        .updateComment(props.selectedComment._id, body.value)
        .then((res) => {
          store.commit("UPDATE_CURRENT_COMMENT", res.data);
          store.commit("SET_NOTIFICATION", {
            message: t("resources.comment.updated"),
          });
          body.value = "";
          context.emit("close:inputer");
        })
        .catch((err) => {
          store.commit("SET_NOTIFICATION", {
            message: err.response.data.message,
            type: "error",
          });
        });
    }

    // focus on input when the compoent has been opened.
    const input = ref();
    onMounted(() => {
      input.value.focus();
    });

    return { body, createComment, deleteComment, updateComment, input };
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

    .reply-to {
      vertical-align: bottom;
    }

    .buttons {
      display: flex;
      gap: 1rem;
    }
  }

  &:focus-within {
    border: 1px solid #add8e6;
    box-shadow: 0px 0px 20px -1px rgba(173, 216, 230, 0.48);
  }
}
</style>
