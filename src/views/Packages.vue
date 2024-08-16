<template>
  <div>
    <Loader v-if="loadingPackage" />
    <Packages />
    <Basket v-if="selectedPackageObject.id" :item="selectedPackageObject" />
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
const { selectedPackageObject, loadingPackage } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
