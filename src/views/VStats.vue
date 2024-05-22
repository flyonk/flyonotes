<template>
  <table class="table">
    <thead>
      <tr>
        <th>Stat</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Amount of Notes </td>
        <td>{{ storeNotes.totalNotesCount }}</td>
      </tr>
      <tr>
        <td>Amount of Characters (of all notes)</td>
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