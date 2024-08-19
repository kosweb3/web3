<template>
  <div class="package-view">
    <Loader v-if="loadingPackage" />
    <Packages />
    <Basket v-if="selectedPackageStoreId" :item="selectedPackageObject" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useStorePackage } from "@/store/package.js";
import Packages from "@/components/packages/Packages.vue";
import Basket from "@/components/payment/Basket.vue";
import Loader from "@/components/loader.vue";

// packageStore
const store = useStorePackage();
const { selectedPackageObject, loadingPackage, selectedPackageStoreId } =
  storeToRefs(store);
</script>

<style lang="scss" scoped></style>
