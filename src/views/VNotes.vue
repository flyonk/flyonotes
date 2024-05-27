<template>
  <div class="notes">

    <CAddEditNote v-model="newNote" ref="addEditNoteRef" :maxLength="noteMaxLength">
      <template #buttons>
        <button class="button is-link has-background-special" @click="addNewNote(newNote)"
          :disabled="!newNote || newNote.length === noteMaxLength">{{ $t('AddNewNote') }}</button>
      </template>
    </CAddEditNote>

    <progress v-if="!storeNotes.isNotesLoaded" class="progress is-large is-success" max="100" />
    <template v-else>
      <CNote v-for="note in storeNotes.notes" :key="note.id" :note="note" @deleteNote="deleteNoteById($event)" />
      <div v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-gray-light is-familiy-monospace py-6">No
        notes here yet...
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CNote from '@/components/Notes/CNote.vue';
import CAddEditNote from '@/components/Notes/CAddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes.js';


const storeNotes = useStoreNotes();
const newNote = ref('');
const addEditNoteRef = ref('');

const noteMaxLength = 450;

const addNewNote = (newContent) => {
  storeNotes.addNote(newContent);
  newNote.value = '';
  addEditNoteRef.value.focusTextArea();
};

const deleteNoteById = (id) => {
  storeNotes.deleteNoteById(id);
};
</script>

<style lang="scss" scoped>
a {
  color: black;
}

.textarea-wrapper-bg-dark-green {
  background-color: #0d4b12;
}

.has-background-special {
  background-color: #15B35D !important;
}


.card-footer-item:hover {
  background-color: #f5f5f5;
}
</style>