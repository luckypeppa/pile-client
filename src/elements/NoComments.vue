<template>
  <div class="no-comments">
    <comment-skeleton />
    <comment-skeleton :style="{ transform: 'translate(20%, -25%)' }" />
    <h2>{{ $t("resources.comment.noComments") }}</h2>
  </div>
</template>

<script>
import CommentSkeleton from "@/elements/CommentSkeleton.vue";
export default {
  components: {
    CommentSkeleton,
  },
};
</script>

<style lang="scss" scoped>
.no-comments {
  display: grid;
  place-content: center;

  h2 {
    margin-top: 2rem;
    text-align: center;
  }
}
</style>
