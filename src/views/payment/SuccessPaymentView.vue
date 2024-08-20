<template>
  <div class="success-payment-view">
    <h2>Welcome to new world WEB3</h2>
    <div class="firework"></div>
    <div class="firework"></div>
    <div class="firework"></div>
    <div class="success-payment-view__button">
      <router-link :to="`${ghp}`">
        <Web3Button>To home page</Web3Button>
      </router-link>
    </div>
    payment {{ payment }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import Web3Button from "@/components/buttons/Web3Button.vue";

const ghp = ref(import.meta.env.VITE_GHP);

const payment = ref({});

onMounted(async () => {
  const session_id = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  console.log("Session ID:", session_id);

  if (session_id) {
    const response = await fetch(`/session/${session_id}`);
    if (response.ok) {
      payment.value = await response.json();
    } else {
      console.error("Session not found");
    }
  }
});
</script>

<style lang="scss" scoped></style>
