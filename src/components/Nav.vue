<template>
  <nav class="navigation">
    <router-link to="/contact">Contact from nav component</router-link>
    <connectWalletButton />
  </nav>
</template>

<script setup>
import connectWalletButton from "./buttons/connectWalletButton.vue";
</script>

<style lang="scss" scoped></style>
