<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <p>Are you sure you want to delete this note?</p>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button class="button" @click="closeModal">Cancel</button>
          <button class="button is-danger" @click="deleteNote">Delete</button>
        </div>
      </footer>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreNotes } from '@/stores/storeNotes';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
});

const modalCardRef = ref(null);
const storeNotes = useStoreNotes();
const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
  emit('update:modelValue', false);
};

const deleteNote = () => {
  storeNotes.deleteNoteById(props.noteId);
  closeModal();
};

onClickOutside(modalCardRef, closeModal);

const handleKeyboard = e => {
  if (e.key === 'Escape') closeModal();
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboard);
});
</script>