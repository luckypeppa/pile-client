<template>
  <div class="container">
    <div class="info">
      <BaseInput type="text" label="Title" v-model="title" />
      <BaseInput type="text" label="Tag" v-model="tag" />
    </div>
    <tip-tap v-model="content" />
  </div>
</template>

<script>
import TipTap from "../../components/TipTap.vue";
export default {
  data() {
    return {
      content: "",
      title: "",
      tag: "",
    };
  },
  components: {
    TipTap,
  },
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
