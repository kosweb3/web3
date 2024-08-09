import { ref } from "vue";
import { defineStore } from "pinia";

export const useStoreMode = defineStore("darkModeSwitcher", () => {
  const isDark = ref(true);

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  const updateBodyClass = (isDark) => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  };

  return { isDark, toggleDark, updateBodyClass };
});
