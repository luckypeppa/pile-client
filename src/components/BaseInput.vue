<template>
  <div class="baseinput-container">
    <label v-if="label" :for="UUID">{{ label }}</label>
    <div class="input-container">
      <input
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="label"
        @input="$emit('update:modelValue', $event.target.value)"
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
  emits: ["modelValue:update"],
  computed: {
    UUID() {
      return UniqueID().getID();
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

  label {
    text-align: left;
  }

  .input-container {
    border: 1px solid gray;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem 0.5rem 1rem;

    input {
      width: 100%;
      outline: none;
      border: none;
    }
  }

  p {
    color: red;
  }
}
</style>
