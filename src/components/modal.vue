<template>
  <div class="modal">
    <div class="modal-container">
      <h3><slot name="header" /></h3>
      <p class="modal-content"><slot name="content" /></p>
      <p class="modal-content"><slot name="subcontent" /></p>
      <div class="modal-btn"><slot name="btn" /></div>
      <button class="close-btn" @click="closeModal"></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<style></style>
