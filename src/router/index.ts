import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './baseRoute';

const router = createRouter({
  routes: baseRoutes,
  history: createWebHistory(),
});

router.beforeEach((_to, _from, next) => {
  next();
}); // 在路由切换前执行

export const setupRouter = (app: App) => {
  app.use(router);
};
