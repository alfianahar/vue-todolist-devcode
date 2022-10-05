<template>
  <Transition name="modal-outer">
    <div
      v-show="modalActive"
      class="w-full bg-black bg-opacity-40 h-screen top-0 left-0 flex justify-center items-center fixed"
      @click.self="toggleModal()"
    >
      <Transition name="modal-inner">
        <div class="relative p-4 w-full max-w-xl h-auto md:h-auto">
          <div class="relative bg-white rounded-lg shadow">
            <form
              autocomplete="off"
              method="POST"
              @submit.prevent="$emit('delete-modal')"
            >
              <div class="p-8 flex flex-col gap-7 items-center">
                <i
                  class="fa-solid fa-triangle-exclamation fa-5x"
                  style="color: #ed4c5c"
                ></i>

                <h1 class="text-center text-xl">
                  Apakah anda yakin untuk menghapus
                  <span class="font-bold">"{{ message }}"</span> ?
                </h1>
              </div>
              <div class="flex justify-center p-6 gap-4">
                <button
                  class="bg-gray-200 text-black font-black py-3 px-12 rounded-full text-md inline-flex"
                  type="button"
                  @click="toggleModal()"
                  data-cy="modal-delete-cancel-button"
                >
                  Back
                </button>
                <button
                  class="bg-[#ed4c5c] text-white font-bold py-3 px-12 rounded-full text-md inline-flex"
                  type="submit"
                  data-cy="modal-delete-confirm-button"
                >
                  Hapus
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
import { ref } from "vue";

defineProps({
  message: {
    type: String,
    default: "New Task",
  },
});
defineEmits(["delete-modal"]);

const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
  return;
};
defineExpose({ toggleModal });
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.15s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.15s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.075s;
}
.modal-inner-leave-active {
  transition: all 0.15s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
