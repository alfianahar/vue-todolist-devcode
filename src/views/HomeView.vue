<template>
  <main class="flex flex-col justify-center items-center px-6 py-11 lg:px-48">
    <div class="flex justify-between w-full">
      <h1 class="font-bold text-3xl">Activity</h1>
      <button
        class="bg-primary text-white font-semibold text-base rounded-full py-3 px-3 lg:px-6 gap-2 inline-flex items-center"
        type="button"
        data-cy="activity-add-button"
      >
        <i class="fa-solid fa-plus"></i>
        <span class="hidden lg:block"> Tambah </span>
      </button>
    </div>
    <LoaderSpin />
  </main>
</template>

<script setup>
import LoaderSpin from "../components/loaderSpin.vue";
</script>

<style lang="scss" scoped></style>
