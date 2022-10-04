<template>
  <Transition name="modal-outer">
    <div
      v-show="modalActive"
      class="w-full bg-black bg-opacity-40 h-screen top-0 left-0 flex justify-center items-center fixed"
      @click.self="toggleModal()"
    >
      <Transition name="modal-inner">
        <div class="relative p-4 w-full max-w-xl h-auto md:h-auto">
          <div class="relative bg-white rounded-lg shadow p-4">
            <div class="inline-flex items-center gap-4">
              <i
                class="fa-solid fa-circle-info fa-2x"
                style="color: #00a790"
              ></i>
              <span>Activity berhasil dihapus</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

vbase
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
