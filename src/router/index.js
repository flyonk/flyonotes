import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import VNotes from '@/views/VNotes.vue'
import VStats from '@/views/VStats.vue'
import VEditNote from '@/views/VEditNote.vue'
import VAuth from '@/views/VAuth.vue'



const routes = [
  { path: '/notes', name: 'notes', component: VNotes },
  { path: '/stats', name: 'stats', component: VStats },
  { path: '/editNote/:id', name: 'Edit Note', component: VEditNote },
  { path: '/auth', name: 'auth', component: VAuth },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth();
  if (!storeAuth.user.id && to.name !== 'auth') {
    return { name: 'auth' }
  }

  if (storeAuth.user.id && to.name === 'auth') {
    return false
  }
});

export default router;