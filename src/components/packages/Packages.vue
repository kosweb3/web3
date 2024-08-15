<template>
  <div class="packages">
    <div class="packages__container">
      <div
        :class="[
          'packages__item',
          { active: selectedPackageStoreId?.idP === index },
        ]"
        v-for="(item, index) in packages"
        :key="index"
      >
        <div class="packages__package" @click="selectedItem(index)">
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

//store package
const store = useStorePackage();
const { selectedPackage, getpackageId } = store;
const { selectedPackageStoreId } = storeToRefs(store);

const packages = ref([
  {
    name: "Package Easy",
    price: "1$",
    id: 0,
    benefits: ["5 notes", "1 website", "add more"],
  },
  {
    name: "Package Standart",
    price: "2$",
    id: 1,
    benefits: ["10 project notes", "2 websites", "add more"],
  },
  {
    name: "Package Pro",
    price: "3$",
    id: 2,
    benefits: ["20 project notes", "3 websites", "Support 24/7", "and more"],
  },
]);
const activePackage = ref(0);

const selectedItem = (index) => {
  activePackage.value = index;
  selectedPackage(index);
};
</script>

<style lang="scss" scoped></style>
