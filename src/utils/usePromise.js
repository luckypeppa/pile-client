import { ref } from "vue";
import { useStore } from "vuex";
export default function (fn) {
  const store = useStore();

  const isLoading = ref(false);
  const results = ref(null);

  const createPromise = async (...args) => {
    isLoading.value = true;
    results.value = null;
    try {
      results.value = await fn(...args);
    } catch (err) {
      console.log(err);
      store.commit("SET_NOTIFICATION", {
        message: err.response.data.message,
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, results, createPromise };
}
