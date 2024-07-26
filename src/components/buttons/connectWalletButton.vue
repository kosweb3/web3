<template>
  <div class="connect-wallet-button">
    <button @click="toggleWalletConnection">
      {{ account ? "Disconnect Wallet" : "Connect Wallet" }}
    </button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/index";

const store = useStore();
const { checkIfWalletIsConnected, toggleWalletConnection, connectWallet } =
  store;
const { account } = storeToRefs(store);

onMounted(() => {
  connectWallet(), checkIfWalletIsConnected();
});
</script>

<style scoped></style>
