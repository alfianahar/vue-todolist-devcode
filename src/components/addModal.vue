<template>
  <Transition name="modal-outer">
    <div
      v-show="modalActive"
      class="w-full bg-black bg-opacity-40 h-screen top-0 left-0 flex justify-center items-center fixed"
      @click.self="toggleModal()"
    >
      <Transition name="modal-inner">
        <div class="relative p-4 w-full lg:w-3/5 h-auto md:h-auto">
          <div class="relative bg-white rounded-xl shadow">
            <div class="flex justify-between items-center py-6 px-7">
              <h1 class="text-xl font-semibold">Tambah List Item</h1>
              <button
                type="button"
                @click="toggleModal()"
                class="hover:bg-gray-200 px-2 py-1 rounded-lg"
              >
                <i class="fa-solid fa-xmark fa-lg" style="color: #a4a4a4"></i>
              </button>
            </div>
            <form
              autocomplete="off"
              method="post"
              @submit.prevent="
                $emit('add-item', { ...state, isEdit: props.isEdit })
              "
            >
              <div class="border-t border-b px-7 pt-9 pb-6 space-y-6">
                <div class="flex flex-col">
                  <label for="name" class="font-semibold text-xs mb-3"
                    >NAMA LIST ITEM</label
                  >
                  <input
                    required
                    v-model="state.title"
                    type="text"
                    placeholder="Tambahkan nama list item"
                    data-cy="modal-add-name-input"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="priority" class="font-semibold text-xs mb-3"
                    >PRIORITY</label
                  >
                  <div class="relative text-lg">
                    <button
                      class="flex items-center justify-between w-full lg:w-1/3 px-4 py-3 bg-white border border-gray-400 rounded-md"
                      @click="state.optDropdown = !state.optDropdown"
                      @blur="state.optDropdown = false"
                      type="button"
                      data-cy="modal-add-priority-dropdown"
                    >
                      <span
                        class="text-gray-400 inline-flex items-center gap-3"
                      >
                        <div
                          class="inline-flex rounded-full h-3 w-3"
                          :class="{
                            'bg-[#ED4C5C]':
                              state.priority.value === 'very-high',
                            'bg-[#F8A541]': state.priority.value === 'high',
                            'bg-[#00A790]': state.priority.value === 'normal',
                            'bg-[#428BC1]': state.priority.value === 'low',
                            'bg-[#8942C1]': state.priority.value === 'very-low',
                          }"
                        ></div>
                        {{ state.priority.label }}
                      </span>

                      <i
                        class="fa-solid fa-angle-down transform transition-transform duration-200 ease-in-out"
                        :class="state.optDropdown ? 'rotate-180' : 'rotate-0'"
                      ></i>
                    </button>
                    <!-- Tailwind style transition -->
                    <transition
                      enter-active-class="transform transition duration-500 ease-custom"
                      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                      enter-to-class="translate-y-0 scale-y-100 opacity-100"
                      leave-active-class="transform transition duration-300 ease-custom"
                      leave-class="translate-y-0 scale-y-100 opacity-100"
                      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
                    >
                      <ul
                        v-show="state.optDropdown"
                        class="absolute left-0 right-0 mb-4 mt-2 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-full lg:w-1/3"
                      >
                        <li
                          v-for="(opt, index) in state.opt"
                          :key="index"
                          @mousedown.prevent="setOpt(opt)"
                          class="px-6 py-2 transition-colors duration-300 hover:bg-gray-200"
                          data-cy="modal-add-priority-item"
                        >
                          <div class="flex justify-between items-center">
                            <div
                              class="inline-flex rounded-full h-3 w-3"
                              :class="{
                                'bg-[#ED4C5C]': opt.value === 'very-high',
                                'bg-[#F8A541]': opt.value === 'high',
                                'bg-[#00A790]': opt.value === 'normal',
                                'bg-[#428BC1]': opt.value === 'low',
                                'bg-[#8942C1]': opt.value === 'very-low',
                              }"
                            ></div>
                            <span class="text-base">{{ opt.label }}</span>
                            <div>
                              {{
                                opt.value === state.priority.value
                                  ? "&#10003;"
                                  : ""
                              }}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </transition>
                  </div>
                  <button
                    type="button"
                    data-cy="modal-add-priority-dropdown"
                  ></button>
                </div>
              </div>
              <div class="flex justify-end px-7 pt-4 pb-5">
                <button
                  class="bg-primary text-white font-semibold text-base rounded-full py-3 px-9 gap-2"
                  :class="{ 'bg-opacity-70': state.title === '' }"
                  :disabled="state.title === ''"
                  type="submit"
                  data-cy="todo-add-button"
                  @click=""
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, ref } from "vue";

const modalActive = ref(false);

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  priority: {
    type: Object,
    default: { label: "Very High", value: "very-high", color: "red" },
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["add-item"]);

const state = reactive({
  title: "",
  priority: { label: "Very High", value: "very-high", color: "red" },
  optDropdown: false,
  opt: [
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
  ],
});

const setState = () => {
  state.priority = props.priority;
  state.title = props.title;
};

const setOpt = (opt) => {
  state.priority = opt;
  state.optDropdown = false;
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
  return;
};
defineExpose({ toggleModal, setState });
</script>

<style scoped>
input[type="text"] {
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
}

input:focus {
  outline: none !important;
  box-shadow: 0 0 5px #16abf8;
}
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
