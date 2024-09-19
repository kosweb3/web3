<template>
  <div :class="['user-data', { blur: menuVisible }]">
    <userAvatar />
    <div class="user-data__email">Hi, {{ data.email }}</div>
  </div>
</template>

<script setup>
import { useStoreNav } from "@/store/nav";
import { storeToRefs } from "pinia";
import userAvatar from "./userAvatar.vue";

const props = defineProps({
  data: {
    type: [Object, String],
    default: {},
  },
});
// store Nav
const storeNav = useStoreNav();
const { menuVisible } = storeToRefs(storeNav);
</script>

<style lang="scss" scoped></style>
