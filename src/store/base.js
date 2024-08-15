import { ref } from "vue";
import { defineStore } from "pinia";

export const useBaseStore = defineStore("base", () => {
  const loader = ref(false);

  return { loader };
});
