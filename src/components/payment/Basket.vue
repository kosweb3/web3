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
      <div class="basket-container__payments">
        <button
          @click="handlePayment(item.stripePriceID)"
          :disabled="!stripe || loader.value"
          class="basket-container__pay"
        >
          <div class="basket-container__price">{{ item.price }}</div>
          <img src="../../assets/img/stripe-logo.png" alt="pay by stripe" />
        </button>
        <button
          v-if="isConnected"
          @click="handleCryptoPayment(item.cryproPrice)"
          class="basket-container__crypto-pay"
        >
          <div class="basket-container__price">{{ item.cryproPrice }}sol</div>

          <img
            src="https://solana.com/_next/static/media/logotype.e4df684f.svg"
            alt="pay by crypto"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useStoreWallet } from "@/store/crypto-payment";
import { loadStripe } from "@stripe/stripe-js";
import { useStorePackage } from "@/store/package.js";
import { useStoreAuth } from "@/store/auth.js";
import { useBaseStore } from "@/store/base.js";
import { useNotificationStore } from "@/store/notification.js";

// package store
const storePackage = useStorePackage();
const { selectedPackageObject } = storeToRefs(storePackage);
const { deleteSelectedPackage } = storePackage;

// auth store
const storeAuth = useStoreAuth();
const { authUser } = storeToRefs(storeAuth);

// baseStore
const baseStore = useBaseStore();
const { loader } = storeToRefs(baseStore);

//notification store
const notificationStore = useNotificationStore();
const { startNofification } = notificationStore;

// crypto wallet store
const storeWallet = useStoreWallet();
const { payBySolana } = storeWallet;
const { isConnected } = storeToRefs(storeWallet);

const myWallet = import.meta.env.VITE_CRYPTO_SOLANA_WALLET;

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const checkUrl = computed(() => {
  if (window.location.href.includes("localhost")) {
    return "http://localhost:5173";
  }
  if (window.location.href.includes("amplify")) {
    return "https://main.d1ophk345xo11r.amplifyapp.com";
  }
  if (window.location.href.includes("amazonaws")) {
    return "http://kosweb3-2024.s3.eu-north-1.amazonaws.com";
  }
});

const stripe = ref(null);

const handleCryptoPayment = async (price) => {
  const token = await authUser.value.getIdToken(true);
  sessionStorage.setItem("paymentToken", token);
  payBySolana(myWallet, price);
  // startNofification("Currenly working with this functionality");
  // console.log("crypto payment");
};

const handlePayment = async (priceID) => {
  try {
    loader.value = true;
    // Get user token from firebase, true refresh token
    const token = await authUser.value.getIdToken(true);
    sessionStorage.setItem("paymentToken", token);
    stripe.value.redirectToCheckout({
      lineItems: [{ price: priceID, quantity: 1 }],
      mode: "payment",
      successUrl: `${checkUrl.value}/success-payment`,
      cancelUrl: `${checkUrl.value}/cancel-payment`,
    });
  } catch (error) {
    console.error("Payment error:", error);
  } finally {
    loader.value = false;
  }
};

onMounted(async () => {
  stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
});
</script>

<style lang="scss" scoped></style>
