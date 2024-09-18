<template>
  <button :class="['web3-button', { disabled: disabled }]"><slot /></button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
