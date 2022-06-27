<template>
  <div class="container">
    <post-editor />
  </div>
</template>

<script>
import PostEditor from "@/components/PostEditor.vue";
export default {
  components: {
    PostEditor,
  },
};
</script>

<style lang="scss">
.create-container {
  border: 1px solid black;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 0 3px 5px rgba($color: hsl(0, 0%, 87%), $alpha: 0.3);

  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .preview {
    width: min(100%, 30rem);
    aspect-ratio: 4/ 3;
    object-fit: cover;
    display: block;
    margin: 1rem auto;
  }
}
</style>
