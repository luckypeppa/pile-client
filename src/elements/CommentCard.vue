<template>
  <div class="comment">
    <h3 class="author">Mike Pipi</h3>
    <p class="body">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam nesciunt
      quidem maxime illum fuga tenetur enim veritatis deserunt, quo dolorum.
    </p>
    <div class="actions"></div>
  </div>
</template>

<script>
export default {};
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
