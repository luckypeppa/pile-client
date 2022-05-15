<template>
  <div class="post-container">
    <tip-tap v-model="content" />
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
export default {
  data() {
    return {
      content: "",
    };
  },
  components: {
    TipTap,
  },
};
</script>

<style lang="scss" scoped>
.post-container {
  padding-top: 5rem;
}
</style>
