<template>
  <div class="flex justify-center">
    <img
      v-if="emptyActivity"
      src="../assets/activity-empty-state.png"
      alt="empty-state"
      class="lg:w-4/6"
    />
    <img
      v-else
      src="../assets/todo-empty-state.png"
      alt="empty-list"
      class="lg:w-4/6"
    />
  </div>
</template>

<script setup>
defineProps({
  emptyActivity: {
    type: Boolean,
    default: true,
  },
});
</script>

<style></style>
