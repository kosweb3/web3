<template>
  <div class="user-avatar">
    <div class="user-data__avatar" v-html="avatar"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStoreAuth } from "@/store/auth.js";
import { useGenerateAvatar } from "@/composables/useGenerateAvatar";

const store = useStoreAuth();
const { authUser, userStoreAvatar } = storeToRefs(store);

const avatar = computed(() => {
  return userStoreAvatar.value
    ? userStoreAvatar.value
    : authUser.value?.photoURL;
});
</script>

<style lang="scss" scoped></style>
