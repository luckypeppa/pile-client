<template>
  <div class="comment">
    <h3 class="author">{{ comment.author.username }}</h3>
    <p class="body">
      {{ comment.body }}
    </p>
    <div class="actions"></div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  border-bottom: 1px solid lightgray;
  padding: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    border-bottom: none;
  }

  .author {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .body {
    color: rgb(98, 97, 97);
  }
}
</style>
