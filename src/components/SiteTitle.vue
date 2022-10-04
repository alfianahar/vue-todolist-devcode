<template>
  <header class="sticky top-0 bg-primary px-6 py-8 lg:py-8 lg:px-48 shadow-lg">
    <RouterLink :to="{ name: 'home' }">
      <h1 class="text-2xl font-bold text-white">TO DO LIST APP</h1>
    </RouterLink>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped></style>
