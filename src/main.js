import './assets/main.css'

import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia'
// import { createI18n } from 'vue-i18n'
// import en from './locales/en.json'
// import ru from './locales/ru.json' 
import { i18n } from './locales/config.js'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})


createApp(App).use(i18n).use(router).use(pinia).mount('#app')
