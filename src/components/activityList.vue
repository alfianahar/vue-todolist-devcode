<template>
  <div class="flex justify-between w-full">
    <h1 class="font-bold text-3xl" data-cy="activity-title">Activity</h1>
    <button
      class="bg-primary text-white font-semibold text-base rounded-full py-3 px-3 lg:px-6 gap-2 inline-flex items-center"
      type="button"
      data-cy="activity-add-button"
      @click="addNewActivity()"
    >
      <i class="fa-solid fa-plus"></i>
      <span class="hidden lg:block"> Tambah </span>
    </button>
  </div>
  <div
    v-if="activityObj.data.length === 0"
    class="min-h-[70vh] lg:min-h-[60vh] flex items-center"
  >
    <EmptyState data-cy="activity-empty-state" @click="addNewActivity()" />
  </div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-7 lg:mt-13"
    data-cy="activity-item"
    v-else
  >
    <ActivityCard
      v-for="activity in activityObj.data"
      :activity="activity"
      :key="activity.id"
      :id="activity.id"
      @delete="deleteModalActive(activity)"
    />
  </div>

  <DeleteModal
    ref="deleteModal"
    :message="activityObj.delTitle"
    @delete-modal="deleteActivity(activityObj.delId)"
    data-cy="modal-delete"
  />
  <DoneAlertModal ref="doneAlertModal" data-cy="modal-information" />
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
import ActivityCard from "./activityCard.vue";
import EmptyState from "./emptyState.vue";
import DeleteModal from "./deleteModal.vue";
import DoneAlertModal from "./doneAlertModal.vue";

const deleteModal = ref();
const doneAlertModal = ref();

const activityObj = reactive({
  data: [],
  delId: "",
  delTitle: "",
});

onMounted(async () => {
  await getActivities();
});

const getActivities = async () => {
  try {
    const response = await axios.get(
      `https://todo.api.devcode.gethired.id/activity-groups?email=alfian.aswinda%40gmail.com`
    );
    //   console.log(response.data.data);
    activityObj.data = response.data.data;
    console.log(activityObj.data);
  } catch (error) {
    console.error(error);
  }
  return;
};

const addNewActivity = async () => {
  const req = {
    title: "New Activity",
    email: "alfian.aswinda@gmail.com",
  };
  await axios.post(
    "https://todo.api.devcode.gethired.id/activity-groups",
    req,
    {
      headers: { "content-type": "application/json" },
    }
  );
  await getActivities();
  return;
};

const deleteModalActive = (value) => {
  activityObj.delId = value.id;
  activityObj.delTitle = value.title;
  deleteModal.value.toggleModal();
  return;
};

const deleteActivity = async (id) => {
  await axios.delete(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`
  );
  await deleteModal.value.toggleModal();
  activityObj.data = activityObj.data.filter((val) => val.id !== id);
  doneAlertModal.value.toggleModal();
};
</script>
