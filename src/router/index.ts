import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes, RedirectRoute } from './baseRoute';

// 由于拓展了meta属性，且vue-router的类型不支持拓展，所以这里使用any类型
const BaseRoutes: any[] = [...baseRoutes, RedirectRoute];

const router = createRouter({
  routes: BaseRoutes,
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

router.afterEach(() => {
  const Loading = window.$loading || null;
  Loading?.finish();
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
