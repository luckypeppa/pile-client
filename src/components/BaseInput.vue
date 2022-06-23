<template>
  <div class="baseinput-container" :class="{ outlined }">
    <label v-if="label" :for="UUID">{{ label }}</label>
    <div class="input-container">
      <font-awesome-icon :icon="prependIcon" v-if="prependIcon" class="icon" />
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
      <font-awesome-icon
        icon="fa-solid fa-xmark"
        class="icon"
        v-show="modelValue"
        @click="$emit('update:modelValue', '')"
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
    prependIcon: {
      type: String,
    },
    outlined: {
      type: Boolean,
      default: false,
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

  &.outlined {
    border: none;
    position: relative;

    &:focus-within label {
      position: absolute;
      display: block;
      left: 5%;
      top: 0;
      transform: translateY(-50%);
    }

    label {
      display: none;
    }

    .input-container {
      border: 1px solid lightgray;
      border-radius: 1rem;
      background-color: RGB(244, 244, 244);

      input:focus::placeholder {
        opacity: 0;
      }
    }
  }

  label {
    text-align: left;
  }

  .input-container {
    padding: 0.8rem 1.4rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      width: 100%;
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 1.5rem;
    }

    .icon {
      color: gray;
      cursor: pointer;
      font-size: 1.3rem;

      &:hover {
        color: black;
      }
    }
  }

  p {
    color: red;
  }
}
</style>
