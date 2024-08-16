<template>
  <div class="success-payment-view">
    <h2>Welcome to new world WEB3</h2>
    <div class="firework"></div>
    <div class="firework"></div>
    <div class="firework"></div>
    <div class="success-payment-view__button">
      <router-link :to="`${ghp}`">
        <Web3Button>To home page</Web3Button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Web3Button from "@/components/buttons/Web3Button.vue";

const ghp = ref(import.meta.env.VITE_GHP);
</script>

<style lang="scss" scoped></style>
