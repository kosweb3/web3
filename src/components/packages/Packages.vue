<template>
  <div class="packages">
    <div class="packages__container">
      <div
        v-for="(item, index) in packages"
        :key="index"
        :class="[
          'packages__item',
          { active: activePacketBasedPayment === index },
        ]"
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
    <div v-if="!isConnected" class="packages__crypto-info">
      ***for crypto payments, you need to connect your wallet first.
    </div>
    <modal
      v-if="modalLessSelectedPackageVisible"
      v-model="modalLessSelectedPackageVisible"
    >
      <template #content>
        It is not possible to change the package to a lower one!
      </template>
      <template #btn>
        <button @click="closeModal">Cancel</button>
      </template>
    </modal>
    <modal v-if="modalVisible" v-model="modalVisible">
      <template #content>
        Are you sure you want to choose another package?
      </template>
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
import { useStoreWallet } from "@/store/crypto-payment";
import { useNotificationStore } from "@/store/notification.js";
import modal from "../modal.vue";

//store package
const store = useStorePackage();
const { selectedPackage, getpackageId } = store;
const {
  packages,
  selectedPackageObject,
  packageAmountOne,
  packageAmountTwo,
  packageAmountThree,
} = storeToRefs(store);

// paymentStore
const paymentStore = useStorePayment();
const { deleteSelectedPackage } = paymentStore;
const { amountFromDb } = storeToRefs(paymentStore);

//notification store
const notificationStore = useNotificationStore();
const { startNofification } = notificationStore;

// crypto wallet store
const storeWallet = useStoreWallet();
const { payBySolana } = storeWallet;
const { isConnected } = storeToRefs(storeWallet);

const modalVisible = ref(false);
const modalLessSelectedPackageVisible = ref(false);
const selectedPackageBeforeDelete = ref(null);

// if amount not found in DB then return last selected package
const activePacketBasedPayment = computed(() =>
  amountFromDb.value.amount === packageAmountOne.value
    ? 0
    : amountFromDb.value.amount === packageAmountTwo.value
    ? 1
    : amountFromDb.value.amount === packageAmountThree.value
    ? 2
    : selectedPackageObject.value?.id
);

const handleDeletePackage = () => {
  deleteSelectedPackage();
  modalVisible.value = false;
  selectedPackageObject.value = selectedPackageBeforeDelete.value;
};

const selectedItem = (index, item) => {
  if (amountFromDb.value.amount && selectedPackageObject.value.id > item.id) {
    modalLessSelectedPackageVisible.value = true;
  } else if (
    amountFromDb.value.amount &&
    selectedPackageObject.value.id !== index
  ) {
    selectedPackageBeforeDelete.value = item;
    modalVisible.value = true;
  } else if (amountFromDb.value.amount) {
    startNofification("Package already selected");
  }
  if (
    !selectedPackageObject.value?.id ||
    selectedPackageObject.value?.id != item.id
  ) {
    selectedPackage(index);
  }
};

const closeModal = () => {
  modalVisible.value = false;
  modalLessSelectedPackageVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
