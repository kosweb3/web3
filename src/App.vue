<template>
  <div>
    <Nav />
    <router-view :class="{ blur: menuVisible }" />
  </div>
</template>

<script setup>
import Nav from "@/components/nav/Nav.vue";

//store
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";

const store = useStoreNav();

const { menuVisible } = storeToRefs(store);
</script>

<style scoped></style>
