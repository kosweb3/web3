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
import Web3Button from "@/components/buttons/Web3Button.vue";

// auth store for check id user
const storeAuth = useStoreAuth();
const { initAuth } = storeAuth;
const { authUser } = storeToRefs(storeAuth);

const paymentStatus = ref(null);

// get token from URL
function getTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

onMounted(async () => {
  const token = getTokenFromUrl();
  if (token) {
    const response = await fetch(
      "http://13.48.148.109:8888/api/record-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Передаємо токен на сервер
        },
        body: JSON.stringify({
          currency: "usd",
          paymentStatus: "succeeded",
          sessionId: "sessionId",
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to send request to server");
      return;
    }
  } else {
    console.error("Token not found in URL");
  }
});
</script>

<style lang="scss" scoped></style>
