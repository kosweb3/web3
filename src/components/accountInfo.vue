<template>
  <div class="account-info">
    <div v-if="account && balance">
      <h2>WalletInfo</h2>
      <p>Connected account: {{ account }}</p>
      <p>Balance: {{ balance }} ETH</p>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "@/store/index";

const store = useStore();
const { account, balance, error } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
