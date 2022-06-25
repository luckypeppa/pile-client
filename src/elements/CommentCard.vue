<template>
  <div class="comment">
    <div class="header">
      <h3 class="author">{{ comment.author.username }}</h3>
      <p v-if="sub && comment.replyTo">
        {{ "Reply to " + comment.replyTo.username }}
      </p>
    </div>
    <p class="body">
      {{ comment.body }}
    </p>
    <div class="actions">
      <base-button
        prependIcon="fa-solid fa-message"
        text
        @click="
          toggleInputer({ commentId: comment._id, replyTo: comment.author })
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
      :replyToUser="replyToUser"
      :parentId="comment._id"
      v-if="inputerOpen && !sub"
      @close:inputer="closeInputer"
    />
  </div>
</template>

<script>
import CommentCard from "./CommentCard";
import CommentInput from "@/components/CommentInput.vue";
import { ref } from "vue";
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
    const activeCommentId = ref("");

    function toggleInputer({ commentId, replyTo }) {
      if (props.sub) {
        context.emit("toggle:inputer", { commentId, replyTo });
      } else {
        if (commentId === activeCommentId.value) {
          inputerOpen.value = !inputerOpen.value;
        } else {
          inputerOpen.value = true;
          replyToUser.value = replyTo;
          activeCommentId.value = commentId;
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

  .sub-comments {
    padding-left: 3rem;
  }
}
</style>
