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
    <modal v-if="modalVisible" v-model="modalVisible">
      <template #content
        >Are you sure you want to choose another package?</template
      >
      <template #subcontent>
        Recovery of the deleted package is not possible*
      </template>
      <template #btn>
        <button @click="closeModal">Cancel</button>
        <button @click="handleDeletePackage">Confirm</button>
      </template>
    </modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStorePackage } from "@/store/package.js";
import { useStorePayment } from "@/store/payment.js";
import modal from "../modal.vue";

//store package
const store = useStorePackage();
const { selectedPackage, getpackageId } = store;
const { packages, selectedPackageObject } = storeToRefs(store);

// paymentStore
const paymentStore = useStorePayment();
const { deleteSelectedPackage } = paymentStore;
const { amountFromDb } = storeToRefs(paymentStore);

const modalVisible = ref(false);

// if amount not found in DB then return last selected package
const activePacketBasedPayment = computed(() =>
  amountFromDb.value.amount === 100
    ? 0
    : amountFromDb.value.amount === 200
    ? 1
    : amountFromDb.value.amount === 300
    ? 2
    : selectedPackageObject.value?.id
);

const handleDeletePackage = () => {
  deleteSelectedPackage();
  modalVisible.value = false;
  selectedPackageObject.value = null;
};
const selectedItem = (index, item) => {
  // check if amount presents in DB and
  // selectedPackageStoreId (Object) id != index show modal
  if (amountFromDb.value.amount && selectedPackageObject.value.id !== index) {
    modalVisible.value = true;
  }
  selectedPackage(index);
};

const closeModal = () => {
  modalVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
