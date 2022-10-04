<template>
  <div class="flex justify-between w-full">
    <div class="inline-flex items-center gap-3 lg:gap-4">
      <RouterLink
        :to="{ name: 'home' }"
        type="button"
        data-cy="activity-add-button"
      >
        <i class="fa-solid fa-angle-left fa-2x"></i>
      </RouterLink>
      <h1
        class="font-bold text-2xl lg:text-3xl"
        id="item-title"
        data-cy="todo-title"
        contenteditable="true"
        @blur="editTitle()"
        @input="handleInput"
      >
        {{ itemState.data.title }}
      </h1>
      <button type="button" @click="focusTitle()">
        <i class="fa-solid fa-pencil"></i>
      </button>
    </div>

    <div class="inline-flex items-center gap-2 lg:gap-4">
      <div>
        <!-- <button
          v-if="itemState.data.length === 0"
          class="hidden"
          type="button"
        ></button> -->
        <button
          class="px-4 py-3 rounded-full border-2 border-[#888888]"
          type="button"
          data-cy="todo-sort-button"
          @click=""
        >
          <i
            class="fa-solid fa-right-left fa-rotate-90"
            style="color: #888888"
          ></i>
        </button>
      </div>
      <button
        class="bg-primary text-white font-semibold text-base rounded-full py-5 lg:py-4 px-5 lg:px-6 gap-2 inline-flex items-center"
        type="button"
        data-cy="todo-add-button"
        @click="addModalActive()"
      >
        <i class="fa-solid fa-plus"></i>
        <span class="hidden lg:block"> Tambah </span>
      </button>
    </div>
  </div>
  <div></div>
  <div class="min-h-[70vh] lg:min-h-[60vh] flex justify-center items-center">
    <EmptyState @click="addModalActive()" emptyActivity />
  </div>

  <div data-cy="modal-add">
    <AddModal
      ref="addModal"
      :title="itemState.addModalTitle"
      :priority="itemState.addModalPriority"
    />
    <!-- :is-edit="itemState.isEdit" -->
    <!-- @when-submit="" -->
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import EmptyState from "./emptyState.vue";
import AddModal from "./addModal.vue";

const route = useRoute();
const addModal = ref();

const itemState = reactive({
  data: [],
  itemId: "",
  addModalTitle: "",
  addModalPriority: {
    label: "Very High",
    value: "very-high",
    color: "red",
  },
  isEdit: false,
  opt: [
    {
      label: "Terbaru",
      value: "terbaru",
      icon: "terbaru",
    },
    {
      label: "Terlama",
      value: "terlama",
      icon: "terlama",
    },
    {
      label: "A-Z",
      value: "a_z",
      icon: "A-Z",
    },
    {
      label: "Z-A",
      value: "z_a",
      icon: "Z-A",
    },
    {
      label: "Belum Selesai",
      value: "belum_selesai",
      icon: "belum-selesai",
    },
  ],
});

onBeforeMount(async () => {
  await getItemList();
});

const getItemList = async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(
      `https://todo.api.devcode.gethired.id/activity-groups/${id}`
    );
    console.log(response.data);
    itemState.data = response.data;
  } catch (error) {
    console.error(error);
  }
  return;
};

const handleInput = (e) => {
  itemState.data.title = e.target.innerHTML;
  return;
};

const focusTitle = () => {
  document.getElementById("item-title").focus();
  return;
};

const editTitle = async () => {
  const request = {
    title: itemState.data.title,
  };
  await axios.patch(
    `https://todo.api.devcode.gethired.id/activity-groups/${itemState.data.id}`,
    request,
    {
      headers: { "content-type": "application/json" },
    }
  );
  console.log(itemState.data);
  return;
};

const addModalActive = (value) => {
  const priorityList = [
    {
      label: "Very High",
      value: "very-high",
      color: "red",
    },
    {
      label: "High",
      value: "high",
      color: "red",
    },
    {
      label: "Medium",
      value: "normal",
      color: "red",
    },
    {
      label: "Very Low",
      value: "very-low",
      color: "red",
    },
    {
      label: "Low",
      value: "low",
      color: "red",
    },
  ];

  const priority = priorityList.find(
    (e) => e.value === value?.priority || "very-high"
  );
  itemState.addModalTitle = value?.title || "";
  itemState.addModalPriority = priority;
  itemState.itemId = value?.id || "";
  itemState.isEdit = typeof value !== "undefined" ? true : false;
  setTimeout(() => {
    addModal.value.setState();
    addModal.value.toggleModal();
  }, 100);
  return;
};
</script>
