<template>
  <div class="edit-note">
    <CAddEditNote v-model="noteContent" :maxLength="150" ref="addEditNoteRef" bgColor="link" placeholder="Edit Note"
      label="Edit Note">
      <template #buttons>
        <button class="button is-link has-background-success mr-1" @click="$router.push('/')">Cancel</button>
        <button class="button is-link has-background-success" :disabled="!noteContent"
          @click="saveNewNote(noteId, noteContent)">Save
          Note</button>
      </template>
    </CAddEditNote>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreNotes } from '@/stores/storeNotes';
import CAddEditNote from '@/components/Notes/CAddEditNote.vue';

const noteContent = ref('');
const store = useStoreNotes();
const router = useRouter();

const noteId = router.currentRoute.value.params.id;

noteContent.value = store.getNoteById(noteId).content;

const saveNewNote = (id, newContent) => {
  store.updateNoteById(id, newContent);
  router.push('/notes');
};
</script>