<template>
  <div
    @click="activityList(activity.id)"
    class="p-6 w-full lg:w-56 h-56 bg-white rounded-xl border border-gray-200 shadow-xl inline-flex flex-col justify-between"
    :id="'card-' + activity.id"
  >
    <h1 class="mb-2 text-xl font-bold" data-cy="activity-item-title">
      {{ activity.title }}
    </h1>
    <div class="flex flex-row justify-between items-center">
      <p
        class="lg:text-sm lg:font-medium text-gray-700"
        data-cy="activity-item-date"
      >
        {{ newDate(activity.created_at) }}
      </p>
      <button
        type="button"
        @click.stop="$emit('delete')"
        data-cy="activity-item-delete-button"
      >
        <i class="fa-regular fa-trash-can" style="color: #888888"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  activity: {
    type: Object,
    default: () => {},
  },
});

defineEmits(["delete"]);

function newDate(value) {
  let val = value.slice(0, 10).split("-");
  let monthNumber = parseInt(val[1]);
  let monthName = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ][monthNumber - 1];

  val[1] = monthName;

  val = val.reverse().join(" ");

  return val;
}

// console.log(activity);
const router = useRouter();
const activityList = (activity) => {
  router.push({
    name: "detail",
    params: {
      id: activity,
    },
  });
  return;
};
</script>
