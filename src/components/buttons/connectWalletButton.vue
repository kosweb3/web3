<template>
  <div class="connect-wallet-button" :class="{ blur: menuVisible }">
    <Web3Button @click="toggleWalletConnection">
      {{ account ? "Disconnect Wallet" : "Connect Wallet" }}
    </Web3Button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useStoreWallet } from "@/store/wallet";
import { useStoreNav } from "@/store/nav";

import Web3Button from "./Web3Button.vue";

const store = useStoreWallet();
const storeNav = useStoreNav();

const { checkIfWalletIsConnected, toggleWalletConnection, connectWallet } =
  store;
const { account } = storeToRefs(store);
const { menuVisible } = storeToRefs(storeNav);

onMounted(() => {
  checkIfWalletIsConnected();
});
</script>

<style scoped></style>
