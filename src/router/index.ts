import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './baseRoute';

const router = createRouter({
  routes: baseRoutes,
  history: createWebHistory(),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((_to, _from, next) => {
  const Loading = window.$loading || null;
  Loading?.start();
  next();
  Loading?.finish();
});

router.afterEach((to) => {
  document.title = (to?.meta?.title as string) || document.title;
  const Loading = window.$loading || null;
  Loading?.finish();
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
