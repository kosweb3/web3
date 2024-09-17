<template>
  <div>
    <Nav />
    <router-view :class="{ blur: menuVisible }" />
    <Loader v-if="loader" />
    <Notification
      v-if="notificationContent"
      :notificationContent="notificationContent"
      :notificationType="notificationType"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Nav from "@/components/nav/Nav.vue";
import Loader from "@/components/loader.vue";
import Notification from "@/components/notification.vue";

//store
import { storeToRefs } from "pinia";
import { useStoreNav } from "@/store/nav";
import { useStoreAuth } from "@/store/auth.js";
import { useStoreMode } from "@/store/mode.js";
import { useBaseStore } from "@/store/base.js";
import { useNotificationStore } from "@/store/notification.js";

//authStore
const storeAuth = useStoreAuth();
const { initAuth } = storeAuth;

//store Nav
const store = useStoreNav();
const { menuVisible } = storeToRefs(store);

//store Mode
const storeMode = useStoreMode();
const { updateBodyClass } = storeMode;
const { isDark } = storeToRefs(storeMode);

// baseStore
const baseStore = useBaseStore();
const { loader } = storeToRefs(baseStore);

//notification store
const notificationStore = useNotificationStore();
const { notificationContent, notificationType } =
  storeToRefs(notificationStore);

onMounted(() => {
  initAuth();
  const isDarkStored = localStorage.getItem("isDark") === "true";
  isDark.value = isDarkStored;
  updateBodyClass(isDarkStored);
});
</script>

<style scoped></style>
