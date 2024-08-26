<template>
  <div class="success-payment-view">
    <h2>Payment not success...</h2>
    <div class="success-payment-view__button">
      <router-link to="/packages">
        <Web3Button>Try again</Web3Button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Web3Button from "@/components/buttons/Web3Button.vue";
</script>

<style lang="scss" scoped></style>
