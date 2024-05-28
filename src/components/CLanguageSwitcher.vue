<template>
  <div class="change-locale select is-info">
    <select v-model="locale" style="height: 100%;">
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { i18n } from '@/locales/config.js';

const locale = ref(i18n.global.locale);

onMounted(() => {
  locale.value = localStorage.getItem('flyonotes-locale');
});

watch(locale, (newX) => {
  localStorage.setItem('flyonotes-locale', newX);
  i18n.global.locale = newX;
});
</script>