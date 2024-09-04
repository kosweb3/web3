<template>
  <div
    :class="[
      'notification',
      { 'notification--err': notificationType === 'errtype' },
    ]"
  >
    {{ notificationContent }}
  </div>
</template>

<script setup>
const props = defineProps({
  notificationContent: {
    type: String,
  },
  notificationType: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
