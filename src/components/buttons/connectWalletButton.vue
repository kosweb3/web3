<template>
  <div class="connect-wallet-button" :class="{ blur: menuVisible }">
    <Web3Button @click="handleConnectWallet" :disabled="isConnected">
      {{ isConnected ? "Wallet connected" : "Connect Wallet" }}
    </Web3Button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useStoreWallet } from "@/store/crypto-payment";
import { useStoreNav } from "@/store/nav";
import { useNotificationStore } from "@/store/notification.js";
import Web3Button from "./Web3Button.vue";

// store Nav
const storeNav = useStoreNav();
const { menuVisible } = storeToRefs(storeNav);

// store Wallet
const storeWallet = useStoreWallet();
const { checkIfWalletIsConnected, connectWallet } = storeWallet;
const { isConnected } = storeToRefs(storeWallet);

//notification store
const notificationStore = useNotificationStore();
const { startNofification } = notificationStore;

const handleConnectWallet = () => {
  if (!isConnected.value) {
    connectWallet();
  } else {
    startNofification("Wallet already connected!");
  }
};

onMounted(() => {
  checkIfWalletIsConnected();
});
</script>

<style scoped></style>
