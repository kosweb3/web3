<template>
  <nav class="navigation">
    <div class="navigation__items">
      <NavBurgerMenu @click="toggleMenu" />
      <ConnectWalletButton />
    </div>
    <Transition name="slide-fade">
      <NavMenu v-if="menuVisible" />
    </Transition>
  </nav>
</template>

<script setup>
import ConnectWalletButton from "@/components/buttons/connectWalletButton.vue";
import NavMenu from "./NavMenu.vue";
import NavBurgerMenu from "./NavBurgerMenu.vue";

//store
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";

const store = useStoreNav();

const { toggleMenu } = store;
const { menuVisible } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
