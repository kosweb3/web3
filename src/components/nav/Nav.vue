<template>
  <nav class="container navigation">
    <div class="navigation__items">
      <NavBurgerMenu @click="toggleMenu" />
      <div class="navigation__items-right">
        <ConnectWalletButton />
        <UserData v-if="authUser" :data="authUser" />
      </div>
    </div>
    <Transition name="slide-fade">
      <NavMenu v-if="menuVisible" />
    </Transition>
  </nav>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";
import { useStoreAuth } from "@/store/auth.js";

import ConnectWalletButton from "@/components/buttons/connectWalletButton.vue";
import NavMenu from "./NavMenu.vue";
import NavBurgerMenu from "./NavBurgerMenu.vue";
import UserData from "../auth/userData.vue";

//store Nav
const store = useStoreNav();
const { toggleMenu } = store;
const { menuVisible } = storeToRefs(store);

//storeAuth
const storeAuth = useStoreAuth();
const { logoutUser } = storeAuth;
const { authUser } = storeToRefs(storeAuth);

const handleClickOutside = (event) => {
  // if menu is open and clickable element is not .nav-burger-menu__item && .nav-menu
  if (
    menuVisible.value &&
    !event.target.closest(".nav-burger-menu__item") &&
    !event.target.closest(".nav-menu")
  ) {
    toggleMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped></style>
