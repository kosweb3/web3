<template>
  <div class="connect-wallet-button" :class="{ blur: menuVisible }">
    <Web3Button @click="handleConnectWallet" :disabledClass="disabledClass">
      {{ isConnected ? "Wallet connected" : "Connect Wallet" }}
    </Web3Button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreWallet } from "@/store/crypto-payment";
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

//store Auth
const storeAuth = useStoreAuth();
const { authUser } = storeToRefs(storeAuth);

const disabledClass = computed(() => {
  return isConnected.value || !userAuth.value;
});

const userAuth = computed(() => {
  return authUser.value?.uid;
});

const handleConnectWallet = () => {
  if (!userAuth.value) {
    startNofification("Wallet connection is only available after login!");
  } else if (userAuth.value && !isConnected.value) {
    connectWallet();
  } else if (userAuth.value && isConnected.value) {
    startNofification("Wallet already connected!");
  }
};

onMounted(() => {
  checkIfWalletIsConnected();
});
</script>

<style scoped></style>
