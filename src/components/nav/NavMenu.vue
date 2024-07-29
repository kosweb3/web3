<template>
  <div class="nav-menu">
    <div class="close-btn" @click="toggleMenu"></div>
    <div class="nav-menu__links">
      <router-link :to="`${ghp}/contact`" @click="toggleMenu">
        Contact with us
      </router-link>
      <span class="nav-menu__links-at">@2024</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
//store
import { storeToRefs } from "pinia";
import { useStore } from "@/store/nav";

const store = useStore();

const { toggleMenu } = store;

const ghp = ref(import.meta.env.VITE_GHP);
</script>

<style lang="scss" scoped></style>
