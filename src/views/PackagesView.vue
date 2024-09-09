<template>
  <div class="package-view container">
    <Loader v-if="loadingPackage" />
    <Packages />
    <Basket
      v-if="selectedPackageObject && !checkAmountFromDb"
      :item="selectedPackageObject"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStorePackage } from "@/store/package.js";
import { useStorePayment } from "@/store/payment.js";
import Packages from "@/components/packages/Packages.vue";
import Basket from "@/components/payment/Basket.vue";
import Loader from "@/components/loader.vue";

// packageStore
const store = useStorePackage();
const { loadingPackage, selectedPackageObject } = storeToRefs(store);

// paymentStore
const paymentStore = useStorePayment();
const { amountFromDb } = storeToRefs(paymentStore);

const checkAmountFromDb = computed(() => {
  return amountFromDb.value.amount ?? false;
});
</script>

<style lang="scss" scoped></style>
