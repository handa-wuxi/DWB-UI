import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locales';
import { setupRouter } from './router';
import { setupStore } from './store';
import 'http://at.alicdn.com/t/font_3427362_b9vmz4f267u.js';
import 'virtual:windi.css';

const app = createApp(App);

async function setup() {
  await setupI18n(app);

  setupStore(app);

  setupRouter(app);

  app.mount('#app');
}

setup();
