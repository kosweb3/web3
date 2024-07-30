<template>
  <div>
    <Nav />
    <router-view :class="{ blur: menuVisible }" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Nav from "@/components/nav/Nav.vue";

//store
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreNotes } from "@/store/notes.js";

//authStore
const storeAuth = useStoreAuth();
const { initAuth } = storeAuth;

//store Nav
const store = useStoreNav();
const { menuVisible } = storeToRefs(store);

//store Notes
const storeNotes = useStoreNotes();
const { init } = storeNotes;

onMounted(() => {
  initAuth();
  // init();
});
</script>

<style scoped></style>
