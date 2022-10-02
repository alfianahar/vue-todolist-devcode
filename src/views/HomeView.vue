<template>
  <main class="flex flex-col gap px-6 py-11 lg:px-48">
    <ActivityList />
    <Suspense>
      <template #fallback>
        <LoaderSpin />
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import LoaderSpin from "../components/loaderSpin.vue";
import ActivityList from "../components/activityList.vue";
</script>

<style lang="scss" scoped></style>
