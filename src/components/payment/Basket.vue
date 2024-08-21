<template>
  <div class="basket-container">
    <div class="basket-container__trash">
      <button
        @click="deleteSelectedPackage"
        title="Remove selected package"
        class="basket-container__trash--btn"
      >
        <img
          src="../../assets/img/svg/basket.svg"
          class="basket-container__trash--img"
        />
      </button>
    </div>
    <div class="basket-container__content">
      <div>{{ item.name }}</div>
      <div>
        <button
          @click="handlePayment(item.stripePriceID)"
          :disabled="!stripe"
          class="basket-container__pay"
        >
          <div class="basket-container__price">{{ item.price }}</div>
          <img src="../../assets/img/stripe-logo.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { loadStripe } from "@stripe/stripe-js";
import { useStorePackage } from "@/store/package.js";
import { useStoreAuth } from "@/store/auth.js";

// store to select Package from user
const storePackage = useStorePackage();
const { selectedPackageStoreId } = storeToRefs(storePackage);
const { deleteSelectedPackage } = storePackage;

const storeAuth = useStoreAuth();
const { authUser } = storeToRefs(storeAuth);

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const stripe = ref(null);

const handlePayment = async (priceID) => {
  const token = await authUser.value.getIdToken(true); // Отримуємо токен користувача
  stripe.value.redirectToCheckout({
    lineItems: [{ price: priceID, quantity: 1 }],
    mode: "payment",
    successUrl: `http://localhost:5173/web3/success-payment?token=${token}`, // Передача токена в URL
    cancelUrl: "http://localhost:5173/web3/cancel-payment",
  });
};

onMounted(async () => {
  stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
});
</script>

<style lang="scss" scoped></style>
