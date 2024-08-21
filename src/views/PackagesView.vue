<template>
  <div class="package-view">
    <Loader v-if="loadingPackage" />
    <Packages />
    <Basket
      v-if="selectedPackageStoreId && !checkAmountFromDb"
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
const { selectedPackageObject, loadingPackage, selectedPackageStoreId } =
  storeToRefs(store);

// paymentStore
const paymentStore = useStorePayment();
const { amountFromDb } = storeToRefs(paymentStore);

const checkAmountFromDb = computed(() => {
  return amountFromDb.value.amount ?? false;
});
</script>

<style lang="scss" scoped></style>
