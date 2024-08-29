<template>
  <div class="notification">{{ notificationContent }}</div>
</template>

<script setup>
const props = defineProps({
  notificationContent: {
    typeo: String,
  },
});
</script>

<style lang="scss" scoped></style>
