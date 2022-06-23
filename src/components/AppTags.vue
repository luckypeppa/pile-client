<template>
  <div class="tags">
    <tag-button tag="All"></tag-button>
    <tag-button
      :tag="tag"
      v-for="(tag, index) in tags"
      :key="index"
    ></tag-button>
  </div>
</template>

<script>
import TagButton from "@/components/TagButton.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();

    const tags = computed(() => store.state.tags.map((tag) => tag.name));

    return { tags };
  },
  components: {
    TagButton,
  },
};
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  margin-top: 1rem;

  button {
    background-color: orange;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0 0 1px 1px rgba(100, 100, 100, 0.5);
  }
}
</style>
