<template>
  <transition name="slide">
    <div class="notification" v-if="notification" appear>
      <div class="message" :style="{ color }">{{ notification.message }}</div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["notification"]),
    color() {
      let color = "green";
      switch (this.notification.type) {
        case "error":
          color = "red";
          break;
        case "info":
          color = "lightblue";
          break;
      }
      return color;
    },
  },
  watch: {
    notification(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.$store.commit("EMPTY_NOTIFICATION");
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  left: 1rem;
  top: 5.5rem;
  z-index: 99;
  background-color: white;
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: 0 0 3px 1px rgba($color: #000000, $alpha: 0.1);
  padding: 0.7rem 2rem;
  font-size: 1.3rem;
}

.slide-enter-from {
  transform: translateX(-200%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}

.slide-leave-to {
  transform: translateX(-200%);
}
</style>
