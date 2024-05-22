<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="colums is-mobile has-text-gray-light mt-2">
          <small class="column small-characters-text has-text-right">{{ characterLength }}</small>
          <small class="column small-characters-text">Date: {{ formatDateFromTimestamp(note.created) }}</small>
        </div>
      </div>
      <footer class="card-footer">
        <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">Edit</RouterLink>
        <a class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
      </footer>
      <CModalDeleteNote :noteId="note.id" v-if="modals.deleteNote" v-model="modals.deleteNote" />
    </div>
  </div>
</template>


<script setup>
import { ref, computed, reactive } from 'vue';
import CModalDeleteNote from '@/components/Notes/CModalDeleteNote.vue';

import { formatDateFromTimestamp } from '@/utils/helpers.js';

const props = defineProps({
  note: Object,
  required: true
});

const deleteNoteRef = ref(null);
const modals = reactive({
  deleteNote: false,
  editNote: false
});


const characterLength = computed(() => {
  return props.note.content.length === 1 ? '1 character' : `${props.note.content.length} characters`;
});
</script>


<style lang="scss" scoped>
.small-characters-text {
  color: gray;
  font-size: 12px;
}

.card-content {
  padding: 25px 0 0 0;
  font-weight: 600;

  .content {
    padding: 0 20px;
  }
}
</style>