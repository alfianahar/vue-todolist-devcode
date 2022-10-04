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
      <div class="relative text-lg">
        <button
          class="px-4 py-3 rounded-full border-2 border-[#888888]"
          type="button"
          data-cy="todo-sort-button"
          @click="itemState.sortDropdown = !itemState.sortDropdown"
        >
          <i
            class="fa-solid fa-right-left fa-rotate-90"
            style="color: #888888"
          ></i>
        </button>
        <transition
          enter-active-class="transform transition duration-500 ease-custom"
          enter-class="-translate-y-1/2 scale-y-0 opacity-0"
          enter-to-class="translate-y-0 scale-y-100 opacity-100"
          leave-active-class="transform transition duration-300 ease-custom"
          leave-class="translate-y-0 scale-y-100 opacity-100"
          leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
        >
          <ul
            v-show="itemState.sortDropdown"
            class="absolute left-0 right-0 mb-4 mt-2 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-52"
          >
            <li
              v-for="(option, index) in itemState.opt"
              :key="index"
              class="px-6 py-3 transition-colors duration-300 hover:bg-gray-200"
              @mousedown.prevent="setOpt(option)"
              data-cy="sort-selection"
            >
              <div class="flex justify-between">
                <span class="text-base font-normal">
                  {{ option.label }}
                </span>
                <div>
                  {{ option.value === itemState.selectedOpt ? "&#10003;" : "" }}
                </div>
              </div>
            </li>
          </ul>
        </transition>
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
  <div
    v-if="itemState.data?.todo_items?.length === 0"
    class="min-h-[70vh] lg:min-h-[60vh] flex justify-center items-center"
  >
    <EmptyState
      data-cy="todo-empty-state"
      @click="addModalActive()"
      emptyActivity
    />
  </div>
  <div v-else class="mt-7 lg:mt-13">
    <div v-for="item in todo_items" :key="item.data" class="py-1">
      <div
        class="p-6 w-full h-20 bg-white rounded-xl border border-gray-200 shadow-xl inline-flex flex-col"
      >
        <div class="flex flex-row justify-between items-center">
          <div class="inline-flex items-center gap-4">
            <input
              data-cy="todo-item-checkbox"
              type="checkbox"
              :id="'checkbox-' + item.id"
              class="w-6 h-6 text-primary rounded focus:ring-primary focus:ring-2"
              :checked="item.is_active === 0"
              @click="setStatusItem(item.id, item.is_active)"
            />
            <div
              class="inline-flex rounded-full h-3 w-3"
              :class="{
                'bg-[#ED4C5C]': item.priority === 'very-high',
                'bg-[#F8A541]': item.priority === 'high',
                'bg-[#00A790]': item.priority === 'normal',
                'bg-[#428BC1]': item.priority === 'low',
                'bg-[#8942C1]': item.priority === 'very-low',
              }"
            ></div>
            <p
              class="text-md text-gray-700"
              :class="{ 'line-through': item.is_active === 0 }"
              data-cy="todo-item-title"
            >
              {{ item.title }}
            </p>
            <button type="button" @click="addModalActive(item)">
              <i class="fa-solid fa-pencil"></i>
            </button>
          </div>

          <button
            type="button"
            @click.prevent="deleteModalActive(item.title, item.id)"
            data-cy="todo-item-delete-button"
          >
            <i class="fa-regular fa-trash-can" style="color: #888888"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <AddModal
    ref="addModal"
    :title="itemState.addModalTitle"
    :priority="itemState.addModalPriority"
    :is-edit="itemState.isEdit"
    @add-item="itemEditor"
    data-cy="modal-add"
  />
  <DeleteModal
    ref="deleteModal"
    :message="itemState.delTitleMsg"
    @delete-modal="deleteActivity(itemState.itemId)"
    data-cy="modal-delete"
  />
  <DoneAlertModal ref="doneAlertModal" data-cy="modal-information" />
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import EmptyState from "./emptyState.vue";
import AddModal from "./addModal.vue";
import DeleteModal from "./deleteModal.vue";
import DoneAlertModal from "./doneAlertModal.vue";

const route = useRoute();
const addModal = ref();
const deleteModal = ref();
const doneAlertModal = ref();

const todo_items = computed(() => {
  let items = itemState.data?.todo_items;

  function compare(a, b, sortedKey, sortedType) {
    if (sortedType === "desc") {
      if (a[sortedKey] < b[sortedKey]) {
        return -1;
      }
      if (a[sortedKey] > b[sortedKey]) {
        return 1;
      }
      return 0;
    }
    if (a[sortedKey] > b[sortedKey]) {
      return -1;
    }
    if (a[sortedKey] < b[sortedKey]) {
      return 1;
    }
    return 0;
  }

  if (itemState.selectedOpt === "terbaru" && items) {
    items.sort((a, b) => compare(a, b, "id", "asc"));
  }
  if (itemState.selectedOpt === "terlama")
    items = items.sort((a, b) => compare(a, b, "id", "desc"));
  if (itemState.selectedOpt === "a_z")
    items = items.sort((a, b) => compare(a, b, "title", "desc"));
  if (itemState.selectedOpt === "z_a")
    items = items.sort((a, b) => compare(a, b, "title", "asc"));
  if (itemState.selectedOpt === "belum_selesai")
    items = items.sort((a, b) => compare(a, b, "is_active", "asc"));

  return items;
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

onBeforeMount(async () => {
  await getItemList();
});

const itemState = reactive({
  data: {},
  itemId: "",
  delTitleMsg: "",
  addModalTitle: "",
  addModalPriority: {
    label: "Very High",
    value: "very-high",
    color: "red",
  },
  isEdit: false,
  sortDropdown: false,
  selectedOpt: "terbaru",
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

const itemEditor = (value) => {
  if (value.isEdit) {
    editItem(value);
    return;
  }
  createItem(value);
  return;
};

const editItem = async (value) => {
  const { title, priority } = value;
  const req = {
    title,
    priority: priority.value,
  };
  await axios.patch(
    `https://todo.api.devcode.gethired.id/todo-items/${itemState.itemId}`,
    req,
    { headers: { "content-type": "application/json" } }
  );
  await getItemList();
  addModal.value.toggleModal();
};

const createItem = async (value) => {
  const activity_group_id = route.params.id;
  const { title, priority } = value;
  const req = {
    activity_group_id,
    title,
    priority: priority.value,
  };
  const response = await axios.post(
    "https://todo.api.devcode.gethired.id/todo-items",
    req,
    {
      headers: { "content-type": "application/json" },
    }
  );
  console.log(response);
  itemState.data.todo_items.push(response);
  addModal.value.toggleModal();
  await getItemList();
  return;
};

const deleteModalActive = (title, id) => {
  itemState.itemId = id;
  itemState.delTitleMsg = title;
  deleteModal.value.toggleModal();
  return;
};

const deleteActivity = async (id) => {
  await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`);
  itemState.data.todo_items = itemState.data.todo_items.filter(
    (val) => val.id !== id
  );
  await deleteModal.value.toggleModal();
  doneAlertModal.value.toggleModal();
};

const setStatusItem = async (id, is_active) => {
  const req = {
    is_active: is_active === 0 ? 1 : 0,
  };
  await axios.patch(
    `https://todo.api.devcode.gethired.id/todo-items/${id}`,
    req,
    { headers: { "content-type": "application/json" } }
  );

  await getItemList();

  return;
};

const setOpt = (opt) => {
  itemState.selectedOpt = opt?.value;
  itemState.sortDropdown = false;
  console.log(itemState.selectedOpt);
};
</script>
