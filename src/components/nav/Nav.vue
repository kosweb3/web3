<template>
  <nav class="navigation">
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
</script>

<style lang="scss" scoped></style>
