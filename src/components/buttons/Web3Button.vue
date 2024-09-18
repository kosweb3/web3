<template>
  <button
    :class="['web3-button', { disabled: disabledClass }]"
    :disabled="disabledButton"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  disabledClass: {
    type: Boolean,
    default: false,
  },
  disabledButton: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
