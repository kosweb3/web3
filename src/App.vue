<template>
  <div>
    <Nav />
    <router-view :class="{ blur: menuVisible }" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Nav from "@/components/nav/Nav.vue";

//store
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreNotes } from "@/store/notes.js";
import { useStoreMode } from "@/store/mode";

//authStore
const storeAuth = useStoreAuth();
const { initAuth } = storeAuth;

//store Nav
const store = useStoreNav();
const { menuVisible } = storeToRefs(store);

//store Notes
const storeNotes = useStoreNotes();
const { init } = storeNotes;

//store Mode
const storeMode = useStoreMode();
const { toggleDark, updateBodyClass } = storeMode;
const { isDark } = storeToRefs(storeMode);

onMounted(() => {
  initAuth();
  // dark Mode
  const isDarkStored = localStorage.getItem("isDark") === "true";
  // check if this string or null
  // check if localStortage('isDark') is string `"true"` ->  isDark.value is true
  // check if localStortage('isDark') is not string `"true"` ->  isDark.value is false
  isDark.value = isDarkStored;
  updateBodyClass(isDarkStored);
});
</script>

<style scoped></style>
