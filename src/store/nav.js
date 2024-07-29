import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("navigation", () => {
  const menuVisible = ref(false);

  const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
  };
  return { menuVisible, toggleMenu };
});
