<template>
  <component :is="element" :aria-label="ariaLabel" :is-disabled="isDisabled">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  element: string;
  ariaLabel?: string;
  isDisabled: boolean;
}>();
</script>

<style scoped></style>
