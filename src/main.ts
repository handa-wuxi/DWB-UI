import 'virtual:windi-components.css';
import 'virtual:windi-base.css';
import 'virtual:windi-utilities.css';
import './styles/index.less';
import 'http://at.alicdn.com/t/font_3427362_b9vmz4f267u.js';
import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locales';
import { setupRouter } from './router';
import { setupStore } from './store';

async function setup() {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  await setupI18n(app);

  app.mount('#app');
}

setup();
