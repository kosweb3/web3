<template>
  <div class="account-info">
    <div v-if="isConnected">
      <h2>WalletInfo</h2>
      <p>
        Connected account:
        <span
          @click="copyToClipboard"
          title="click for copy to clipboard"
          ref="copiedValue"
          class="account-info__copied"
        >
          {{ solanaAdres }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreWallet } from "@/store/crypto-payment";
import { useNotificationStore } from "@/store/notification.js";

// wallet store
const store = useStoreWallet();
const { isConnected, solanaAdres } = storeToRefs(store);

//notification store
const notificationStore = useNotificationStore();
const { startNofification } = notificationStore;

const copiedValue = ref(null);
const copyToClipboard = () => {
  const element = copiedValue.value.innerHTML;
  navigator.clipboard
    .writeText(element)
    .then(() => {
      startNofification("Addres copied to clipboard!");
    })
    .catch((err) => {
      startNofification("Failed to copy text", "errtype");
    });
};
</script>

<style lang="scss" scoped></style>
