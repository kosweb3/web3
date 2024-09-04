<template>
  <div class="account-info">
    <div v-if="account && balance">
      <h2>WalletInfo</h2>
      <p>
        Connected account:
        <span
          @click="copyToClipboard"
          title="click for copy to clipboard"
          ref="copiedValue"
          class="account-info__copied"
        >
          {{ account }}
        </span>
      </p>
      <p>Balance: {{ balance }} ETH</p>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreWallet } from "@/store/wallet";
import { useNotificationStore } from "@/store/notification.js";

// wallet store
const store = useStoreWallet();
const { account, balance, error } = storeToRefs(store);

//notification store
const notificationStore = useNotificationStore();
const { startNofification } = notificationStore;

const copiedValue = ref(null);
const copyToClipboard = () => {
  const element = copiedValue.value.innerHTML;
  navigator.clipboard
    .writeText(element)
    .then(() => {
      startNofification("Text copied to clipboard!");
    })
    .catch((err) => {
      startNofification("Failed to copy text", "errtype");
    });
};
</script>

<style lang="scss" scoped></style>
