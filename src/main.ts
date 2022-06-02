import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locales';
import { setupRouter } from './router';
import { setupStore } from './store';
import Monitor from './utils/monitor';
// import globalApi from './api/global';
// import userAgent from './utils/userAgent';
import 'http://at.alicdn.com/t/font_3427362_b9vmz4f267u.js';
import 'virtual:windi.css';

const app = createApp(App);

new Monitor((msg) => {
  // globalApi.insertLogs({
  //   ...msg,
  //   userAgent: userAgent(),
  // });
});
async function setup() {
  setupStore(app);

  setupRouter(app);

  await setupI18n(app);

  app.mount('#app');
}

setup();
