/* global  __VITE_APP_VERSION__ */
import { createApp } from 'vue';
import { createHead } from '@unhead/vue/client';
import { createI18n } from 'vue-i18n';
import { register } from 'swiper/element/bundle';

import App from './App.vue';
import router from './router';
import en from '@/locales/en.js';
import es from '@/locales/es.js';

import '@/assets/index.css';

localStorage.setItem('version', __VITE_APP_VERSION__);

const app = createApp(App);
const head = createHead();
const i18n = createI18n({
  locale: 'en',
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
});

register();

app.use(router);
app.use(head);
app.use(i18n);

router.isReady().then(() => {
  app.mount('#app');
});
