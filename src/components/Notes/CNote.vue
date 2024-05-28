<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content overflow-hidden">
        <p class="content-text">{{ note.content }}</p>
        <div class="colums is-mobile has-text-gray-light mt-2">
          <small class="column small-characters-text has-text-right">{{ characterLength }}</small>
          <small class="column small-characters-text">{{ $t('Date') }}: {{ formatDateFromTimestamp(note.created)
            }}</small>
        </div>
      </div>
      <footer class="card-footer">
        <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">{{ $t('Edit') }}</RouterLink>
        <a class="card-footer-item" @click.prevent="modals.deleteNote = true">{{ $t('Delete') }}</a>
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

const modals = reactive({
  deleteNote: false,
  editNote: false
});


const characterLength = computed(() => {
  return props.note.content.length === 1 ? '1 character' : `${props.note.content.length} characters`;
});
</script>


<style lang="scss" scoped>
.card-footer-item:hover {
  background-color: #f5f5f5;
}

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