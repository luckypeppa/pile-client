<template>
  <div>
    <label v-if="label" :for="UUID">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="UUID"
      :aria-describedby="error ? `${UUID}-error` : null"
      :aria-invalid="error ? true : null"
    />
    <p v-if="error" :id="`${UUID}-error`" airia-live="assertive">{{ error }}</p>
  </div>
</template>

<script>
import UniqueID from "../utils/UUID";
export default {
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: String,
      default: "",
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
  },
  emits: ["modelValue:update"],
  computed: {
    UUID() {
      return UniqueID().getID();
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  label {
    text-align: left;
  }

  input {
    padding: 0.1rem;
  }

  p {
    color: red;
  }
}
</style>
