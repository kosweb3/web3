<template>
  <div class="success-payment-view">
    <h2>Welcome to new world WEB3</h2>
    <div class="firework"></div>
    <div class="firework"></div>
    <div class="firework"></div>
    <div class="success-payment-view__button">
      <router-link to="/">
        <Web3Button>To home page</Web3Button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { loadStripe } from "@stripe/stripe-js";
import { useStoreAuth } from "@/store/auth.js";
import { useStorePackage } from "@/store/package.js";
import Web3Button from "@/components/buttons/Web3Button.vue";

// auth store for check id user
const storeAuth = useStoreAuth();
const { initAuth } = storeAuth;
const { authUser } = storeToRefs(storeAuth);

// package store
const storePackage = useStorePackage();
const { selectedPackageObject } = storeToRefs(storePackage);
const { deleteSelectedPackage } = storePackage;

const cryptoPrice = computed(() => {
  const price = selectedPackageObject.value.cryproPrice || null;
  return price ? price.toString() : null;
});

// get token from URL
function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

onMounted(async () => {
  const token = sessionStorage.getItem("paymentToken");
  const signature = sessionStorage.getItem("signature");

  let requestBody = {};

  if (token && signature) {
    requestBody = {
      currency: "crypto",
      cryptoPrice: cryptoPrice.value,
      paymentStatus: "succeeded",
      tokenUser: token,
      cryptoSignature: signature,
    };
  } else if (token) {
    requestBody = {
      currency: "usd",
      paymentStatus: "succeeded",
      tokenUser: token,
    };
  }

  try {
    const response = await fetch(
      "https://kosweb3-01c70ca57756.herokuapp.com/api/record-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      console.error("Failed to send request to server", response.statusText);
      return;
    }
  } catch (error) {
    console.error("Error sending request to server:", error);
  }
});
</script>

<style lang="scss" scoped></style>
