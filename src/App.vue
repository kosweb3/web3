<template>
  <div>
    <!-- <Nav /> -->
    <div>{{ $route.fullPath }}</div>
    <nav>
      <router-link to="/">Home</router-link> |||
      <router-link to="/contact">contact</router-link>
    </nav>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
</script>

<style scoped></style>
