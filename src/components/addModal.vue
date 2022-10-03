<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="w-full bg-black bg-opacity-40 h-screen top-0 left-0 flex justify-center items-center fixed"
        @click.self="toggleModal()"
      >
        <Transition name="modal-inner">
          <div class="relative p-4 w-full lg:w-3/4 h-auto md:h-auto">
            <div class="relative bg-white rounded-lg shadow">
              <div class="flex justify-between items-center py-6 px-7">
                <h1 class="text-lg font-semibold">Tambah List Item</h1>
                <button
                  type="button"
                  @click="toggleModal()"
                  class="hover:bg-gray-200 px-2 py-1 rounded-lg"
                >
                  <i class="fa-solid fa-xmark fa-lg" style="color: #a4a4a4"></i>
                </button>
              </div>
              <form>
                <div class="border-t border-b px-7 pt-9 pb-6 space-y-6">
                  <div class="flex flex-col">
                    <label for="name" class="font-semibold text-xs mb-3"
                      >NAMA LIST ITEM</label
                    >
                    <input
                      required
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
                        @click=""
                        @blur=""
                        type="button"
                        data-cy="modal-add-priority-dropdown"
                      >
                        <span
                          class="text-gray-400 inline-flex items-center gap-3"
                        >
                          <div
                            class="inline-flex rounded-full h-3 w-3"
                            :class="{}"
                          ></div>
                        </span>

                        <i
                          class="fa-solid fa-angle-down transform transition-transform duration-200 ease-in-out"
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
                          class="absolute left-0 right-0 mb-4 mt-2 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-full lg:w-1/3"
                        >
                          <li
                            class="px-6 py-4 transition-colors duration-300 hover:bg-gray-200"
                            data-cy="modal-add-priority-item"
                          >
                            <div class="flex justify-between">
                              <div
                                class="inline-flex rounded-full h-3 w-3"
                                :class="{}"
                              ></div>
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
                    type="button"
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
  </Teleport>
</template>

<script setup>
import { ref } from "vue";

const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
  return;
};
defineExpose({ toggleModal });
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
