<template>
  <section class="comments-container" :style="{ width: width }">
    <no-comments />
    <header class="header">
      <h2 class="title">
        Comments
        <span class="badge">12</span>
      </h2>
    </header>
    <div class="comments">
      <comment-card />
      <comment-card />
      <comment-card />
    </div>
  </section>
</template>

<script>
import NoComments from "@/elements/NoComments.vue";
import CommentCard from "@/elements/CommentCard.vue";
export default {
  props: {
    width: {
      type: String,
    },
  },
  components: {
    NoComments,
    CommentCard,
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

  .no-comments {
    display: grid;
    place-content: center;
  }

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
</style>
