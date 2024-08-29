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
          v-if="account"
          @click="handleCryptoPayment"
          class="basket-container__crypto-pay"
        >
          <div class="basket-container__price">~0.26 ETH</div>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/archive/3/36/20220831120338%21MetaMask_Fox.svg"
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
import { useStoreWallet } from "@/store/wallet";
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
const { account, balance, error } = storeToRefs(storeWallet);

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

const handleCryptoPayment = () => {
  startNofification("Currenly working with this functionality");
  console.log("crypto payment");
};

const handlePayment = async (priceID) => {
  try {
    loader.value = true;
    // Get user token from firebase, true refresh token
    const token = await authUser.value.getIdToken(true);
    stripe.value.redirectToCheckout({
      lineItems: [{ price: priceID, quantity: 1 }],
      mode: "payment",
      successUrl: `${checkUrl.value}/success-payment?token=${token}`,
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
