<template>
  <table class="table">
    <thead>
      <tr>
        <th>{{ $t('Stat') }}</th>
        <th>{{ $t('Value') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ $t('AmountOfNotes') }}</td>
        <td>{{ storeNotes.totalNotesCount }}</td>
      </tr>
      <tr>
        <td>{{ $t('AmountOfCharacters') }}</td>
        <td>{{ storeNotes.totalCharactersCount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

const storeNotes = useStoreNotes();
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
}
</style>