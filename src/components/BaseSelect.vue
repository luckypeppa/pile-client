<template>
  <div class="select-container">
    <label :for="uuid">{{ label }}</label>
    <select
      :id="uuid"
      :value="modelValue"
      class="select"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import UUID from "@/utils/UUID";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    const uuid = UUID();

    return { uuid };
  },
};
</script>

<style lang="scss" scoped>
.select-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;

  .select {
    font-size: 1.3rem;
    width: 5rem;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 0.7rem;
    padding: 0.2rem;
  }
}
</style>
