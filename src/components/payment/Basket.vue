<template>
  <div class="basket-container">
    <div>{{ item.name }}</div>
    <div>
      <div>{{ item.price }}</div>
      <button @click="handlePayment(item.stripePriceID)" :disabled="!stripe">
        Buy with Stripe
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

// Initialization Stripe
const stripe = ref(null);

const handlePayment = async (priceID) => {
  stripe.value.redirectToCheckout({
    lineItems: [{ price: priceID, quantity: 1 }],
    mode: "payment",
    successUrl: "http://localhost:5173/web3/success-payment",
    cancelUrl: "http://localhost:5173/web3/cancel-payment",
  });
};

onMounted(async () => {
  stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
});
</script>

<style lang="scss" scoped></style>
