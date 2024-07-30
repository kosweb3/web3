<template>
  <div class="auth">
    <div>
      <ul class="auth__tabs">
        <li
          :class="['auth__tab', { 'is-active': !register }]"
          @click="toggleAuth"
        >
          Login
        </li>
        <li
          :class="['auth__tab', { 'is-active': register }]"
          @click="toggleAuth"
        >
          Register
        </li>
      </ul>
      <authForm :register="register" :key="register" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";
import authForm from "@/components/auth/authForm.vue";

const store = useStoreAuth();
const { errorUser } = storeToRefs(store);

const register = ref(false);

const toggleAuth = () => {
  errorUser.value = "";
  register.value = !register.value;
};
</script>

<style lang="scss" scoped></style>
