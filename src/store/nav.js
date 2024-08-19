import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useStoreNav = defineStore("navigation", () => {
  const menuVisible = ref(false);

  const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
  };

  watch(menuVisible, (newValue) => {
    if (newValue) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  });
  return { menuVisible, toggleMenu };
});
