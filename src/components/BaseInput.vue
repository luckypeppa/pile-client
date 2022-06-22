<template>
  <div class="baseinput-container">
    <label v-if="label" :for="UUID">{{ label }}</label>
    <div class="input-container">
      <input
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="label"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="$emit('update:input', $event)"
        :id="UUID"
        :aria-describedby="error ? `${UUID}-error` : null"
        :aria-invalid="error ? true : null"
      />
    </div>
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
  emits: ["update:modelValue", "add:tag"],
  computed: {
    UUID() {
      return UniqueID();
    },
  },
};
</script>

<style lang="scss" scoped>
.baseinput-container {
  width: min(20rem, 100%);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-bottom: 1px solid black;

  label {
    text-align: left;
  }

  .input-container {
    padding: 0.3rem 1rem 0.5rem 1rem;

    input {
      width: 100%;
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 1.5rem;
    }
  }

  p {
    color: red;
  }
}
</style>
