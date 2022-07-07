<template>
  <div class="checkbox-container">
    <label for="toggle" :class="{ checked: modelValue }">{{ label }}</label>
    <input
      type="checkbox"
      id="toggle"
      :checked="modelvalue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.checkbox-container {
  $font-size: 1rem;
  font-size: $font-size;
  min-height: $font-size;

  label {
    margin-right: 3rem;
    cursor: pointer;
    position: relative;
    $border-width: 1px;
    $width: $font-size * 2.5;

    &::before,
    &::after {
      content: "";
      position: absolute;
    }

    &::before {
      bottom: 0;
      width: $width;
      border-radius: 5rem;
      background: white;
      border: $border-width solid black;
      height: calc($font-size + 2px);
      left: 120%;
    }

    &::after {
      bottom: $border-width;
      left: calc(120% + $border-width);
      height: $font-size;
      width: $font-size;
      background-color: lightgray;
      border-radius: 50%;
      transition: all 400ms ease;
    }

    &.checked::after {
      background-color: RGB(253, 200, 133);
      left: calc(120% + $width - $font-size);
    }
  }

  input {
    opacity: 0;
    scale: 0;
    user-select: none;
    pointer-events: none;
  }
}
</style>
