<template>
  <div class="nav-menu">
    <div class="close-btn" @click="toggleMenu"></div>
    <div class="nav-menu__links">
      <router-link :to="`${ghp}`" @click="toggleMenu"> Home Page </router-link>
      <router-link v-if="userAuth" :to="`${ghp}/packages`" @click="toggleMenu">
        Packages
      </router-link>
      <router-link :to="`${ghp}/contact`" @click="toggleMenu">
        Contact with us
      </router-link>
      <router-link v-if="userAuth" :to="`${ghp}/notes`" @click="toggleMenu">
        <!-- v-if="notesLength" -->
        Notes
        <span v-if="maxNotesFromPackage">
          {{ notesLength }}/{{ maxNotesFromPackage }}
        </span>
      </router-link>
      <span v-if="!userAuth" @click="toggleMenu">
        <router-link :to="`${ghp}/login`"> Login </router-link>
      </span>
      <span v-else @click="toggleMenu">
        <router-link :to="`${ghp}`" @click="logoutUser"> Logout </router-link>
      </span>

      <DarkModeSwitcher />

      <span class="nav-menu__links-at">@2024</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreNotes } from "@/store/notes.js";
import { useStorePackage } from "@/store/package.js";
import DarkModeSwitcher from "../buttons/darkModeSwitcher.vue";

const ghp = ref(import.meta.env.VITE_GHP);

//store Nav
const store = useStoreNav();
const { toggleMenu } = store;
const { menuVisible } = storeToRefs(store);

//store Auth
const storeAuth = useStoreAuth();
const { logoutUser } = storeAuth;
const { authUser } = storeToRefs(storeAuth);

//store Notes
const storeNotes = useStoreNotes();
const { notes } = storeToRefs(storeNotes);

//store package
const storePackage = useStorePackage();
const { maxNotesFromPackage } = storeToRefs(storePackage);

const userAuth = computed(() => {
  return authUser.value?.uid;
});

const notesLength = computed(() => {
  return notes.value?.length;
});
</script>

<style lang="scss" scoped></style>
