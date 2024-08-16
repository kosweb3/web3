<template>
  <div :class="{ hidden: menuVisible }">
    <Nav />
    <router-view :class="{ blur: menuVisible }" />
    <Loader v-if="loader" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Nav from "@/components/nav/Nav.vue";
import Loader from "@/components/loader.vue";

//store
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreNotes } from "@/store/notes.js";
import { useStoreMode } from "@/store/mode.js";
import { useBaseStore } from "@/store/base.js";

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

// baseStore
const baseStore = useBaseStore();
const { loader } = storeToRefs(baseStore);

onMounted(() => {
  initAuth();
  const isDarkStored = localStorage.getItem("isDark") === "true";
  // check if this string or null
  // check if localStortage('isDark') is string `"true"` ->  isDark.value is true
  // check if localStortage('isDark') is not string `"true"` ->  isDark.value is false
  isDark.value = isDarkStored;
  updateBodyClass(isDarkStored);
});
</script>

<style scoped></style>
