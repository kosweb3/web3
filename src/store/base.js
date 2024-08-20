import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useBaseStore = defineStore("base", () => {
  const loader = ref(false);
  const modalVisible = ref(false);

  watch(modalVisible, (newValue) => {
    if (newValue) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  });

  return { loader, modalVisible };
});
