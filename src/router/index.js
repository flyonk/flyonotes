import { createRouter, createWebHashHistory } from 'vue-router'

import VNotes from '@/views/VNotes.vue'
import VStats from '@/views/VStats.vue'
import VEditNote from '@/views/VEditNote.vue'
import VAuth from '@/views/VAuth.vue'

const routes = [
  { path: '/notes', name: 'notes', component: VNotes },
  { path: '/stats', name: 'stats', component: VStats },
  { path: '/editNote/:id', name: 'Edit Note', component: VEditNote },
  { path: '/auth', name: 'Auth', component: VAuth },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;