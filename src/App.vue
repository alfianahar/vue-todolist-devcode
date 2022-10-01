<template>
  <div class="min-h-screen font-Poppins bg-latar">
    <SiteTitle />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteTitle from "./components/SiteTitle.vue";
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
