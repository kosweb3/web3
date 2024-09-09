<template>
  <div class="home-view container">
    <div class="home-view__container">
      <Suspense>
        <template #default>
          <AccountInfo />
        </template>
        <template #fallback>
          <AccountInfoSkeletors />
        </template>
      </Suspense>
      <h1>WEB 3 project in progress...</h1>
    </div>
  </div>
</template>

<script setup>
import AccountInfo from "@/components/accountInfo.vue";
import AccountInfoSkeletors from "@/components/skeletors/AccountInfoSkeletors.vue";
</script>

<style lang="scss" scoped></style>
