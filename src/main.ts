import 'virtual:windi.css';
import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locales';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import { AppProvider } from '@/components/Application';
import 'http://at.alicdn.com/t/font_3427362_b9vmz4f267u.js';

async function setup() {
  const appProvider = createApp(AppProvider);

  const app = createApp(App);

  await setupI18n(app);

  setupStore(app);

  appProvider.mount('#appProvider', true);

  await setupRouter(app);

  await router.isReady();

  app.mount('#app');
}

setup();
