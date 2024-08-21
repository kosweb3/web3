<template>
  <div class="packages">
    <div class="packages__container">
      <div
        :class="[
          'packages__item',
          { active: activePacketBasedPayment === index },
        ]"
        v-for="(item, index) in packages"
        :key="index"
      >
        <div class="packages__package" @click="selectedItem(index, item)">
          <div class="packages__price">{{ item.price }}</div>
          <div class="packages__name">{{ item.name }}</div>
          <div
            class="packages__benefits"
            v-for="(benefit, index) in item.benefits"
            :key="index"
          >
            <div class="packages__benefit">{{ benefit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStorePackage } from "@/store/package.js";
import { useStorePayment } from "@/store/payment.js";

//store package
const store = useStorePackage();
const { selectedPackage, getpackageId } = store;
const { packages, selectedPackageStoreId } = storeToRefs(store);

// paymentStore
const paymentStore = useStorePayment();
const { amountFromDb } = storeToRefs(paymentStore);

const activePackage = ref(0);

const activePacketBasedPayment = computed(() =>
  amountFromDb.value.amount === 100
    ? 0
    : amountFromDb.value.amount === 200
    ? 1
    : amountFromDb.value.amount === 300
    ? 2
    : selectedPackageStoreId.value.idP
);

const selectedItem = (index, item) => {
  activePackage.value = index;
  selectedPackage(index);
};
</script>

<style lang="scss" scoped></style>
