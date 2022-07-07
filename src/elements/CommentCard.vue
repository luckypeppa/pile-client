<template>
  <div class="comment" @click="closeInputer">
    <div class="header">
      <h3 class="author">{{ comment.author?.username }}</h3>
      <p v-if="sub && comment.replyTo">
        {{ "Reply to " + comment.replyTo?.username }}
      </p>
    </div>
    <p class="body">
      {{ comment.body }}
    </p>
    <div class="actions">
      <base-button
        prependIcon="fa-solid fa-message"
        text
        @click="toggleInputer({ comment, isEditingBoolean: false })"
      ></base-button>
      <base-button
        prependIcon="fa-solid fa-pen-to-square"
        text
        v-if="isAuthor"
        data-test-id="edit-button"
        @click="
          toggleInputer({
            comment,
            isEditingBoolean: true,
          })
        "
      ></base-button>
    </div>
    <div class="sub-comments" v-if="!sub">
      <comment-card
        v-for="(subComment, index) in comment.children"
        :comment="subComment"
        :key="index"
        sub
        @toggle:inputer="toggleInputer"
      />
    </div>
    <comment-input
      :parentId="comment._id"
      :selectedComment="selectedComment"
      v-if="inputerOpen && !sub"
      @close:inputer="closeInputer"
      :isEditing="isEditing"
      @click.stop
    />
  </div>
</template>

<script>
import CommentCard from "./CommentCard";
import CommentInput from "@/components/CommentInput.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    sub: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CommentCard,
    CommentInput,
  },
  emits: ["toggle:inputer"],
  setup(props, context) {
    const inputerOpen = ref(false);
    const replyToUser = ref({});

    // indicate which comment the user is replying to
    const selectedComment = ref({});
    const isEditing = ref(false);

    // check if the current user is the author of the comment
    const store = useStore();
    console.log(props.comment.author._id);
    const isAuthor = computed(
      () => props.comment.author._id === store.state.user._id
    );

    function toggleInputer({ comment, isEditingBoolean }) {
      if (props.sub) {
        context.emit("toggle:inputer", { comment, isEditingBoolean });
      } else {
        if (
          comment._id === selectedComment.value._id &&
          isEditing.value === isEditingBoolean
        ) {
          inputerOpen.value = !inputerOpen.value;
        } else {
          inputerOpen.value = false;
          setTimeout(() => {
            inputerOpen.value = true;
            selectedComment.value = comment;
            isEditing.value = isEditingBoolean;
          });
        }
      }
    }

    function closeInputer() {
      inputerOpen.value = false;
    }

    return {
      inputerOpen,
      toggleInputer,
      replyToUser,
      closeInputer,
      selectedComment,
      isEditing,
      isAuthor,
    };
  },
};
</script>

<style lang="scss" scoped>
.comment {
  border-bottom: 1px solid lightgray;
  padding: 1rem;
  margin-bottom: 1rem;

  .header {
    display: flex;
    gap: 1rem;
  }

  &:last-child {
    border-bottom: none;
  }

  .author {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .body {
    color: rgb(98, 97, 97);
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
  }

  .sub-comments {
    padding-left: 3rem;
  }
}
</style>
