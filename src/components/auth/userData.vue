<template>
  <div class="user-data">Hi, {{ data.email }}</div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: [Object, String],
    default: {},
  },
});
</script>

<style lang="scss" scoped></style>
