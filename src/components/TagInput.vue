<template>
  <div class="tag-input">
    <div class="tags">
      <tag-button v-for="(t, index) in tags" :key="index">{{ t }}</tag-button>
    </div>
    <BaseInput
      type="text"
      label="Tags(Enter to add)"
      :model="tag"
      @update:input="emitTag"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import TagButton from "@/components/TagButton.vue";
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  emits: ["add: tag"],
  components: {
    TagButton,
  },
  setup(props, context) {
    const tag = ref("");

    function emitTag(e) {
      context.emit("add:tag", e.target.value);
      e.target.value = "";
    }

    return { tag, emitTag };
  },
};
</script>

<style lang="scss" scoped>
.tag-input {
  margin-bottom: 2rem;

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
