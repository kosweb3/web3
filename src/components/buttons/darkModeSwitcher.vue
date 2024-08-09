<template>
  <div class="mode-switch">
    <input
      type="checkbox"
      id="switch"
      class="mode-switch__input"
      @click="toggleDark"
      :checked="isDark"
    />
    <label class="mode-switch__label" for="switch"></label>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStoreMode } from "@/store/mode";

//store Mode
const storeMode = useStoreMode();
const { toggleDark, updateBodyClass } = storeMode;
const { isDark } = storeToRefs(storeMode);

watch(
  () => isDark.value,
  (newQuery) => {
    localStorage.setItem("isDark", newQuery);
    updateBodyClass(newQuery);
  }
);

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
