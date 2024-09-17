<template>
  <div class="connect-wallet-button" :class="{ blur: menuVisible }">
    <Web3Button @click="toggleWalletConnection">
      {{ isConnected ? "Disconnect Wallet" : "Connect Wallet" }}
    </Web3Button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useStoreWallet } from "@/store/wallet-new";
import { useStoreNav } from "@/store/nav";
import Web3Button from "./Web3Button.vue";

// store Nav
const storeNav = useStoreNav();
const { menuVisible } = storeToRefs(storeNav);
// store Wallet
const storeWallet = useStoreWallet();
const { toggleWalletConnection, checkIfWalletIsConnected } = storeWallet;
const { isConnected } = storeToRefs(storeWallet);

onMounted(() => {
  checkIfWalletIsConnected();
});
</script>

<style scoped></style>
