<template>
  <div :class="['user-data', { blur: menuVisible }]">Hi, {{ data.email }}</div>
</template>

<script setup>
import { useStoreNav } from "@/store/nav";
import { storeToRefs } from "pinia";

const props = defineProps({
  data: {
    type: [Object, String],
    default: {},
  },
});

const storeNav = useStoreNav();
const { menuVisible } = storeToRefs(storeNav);
</script>

<style lang="scss" scoped></style>
