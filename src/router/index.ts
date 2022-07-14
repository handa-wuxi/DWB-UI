import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAsyncRouteStore } from '@/store';
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

router.afterEach((to) => {
  const Loading = window.$loading || null;
  const asyncRouteStore = useAsyncRouteStore();
  const { keepAliveComponents } = asyncRouteStore;
  const currentComName: any = to.matched.find((item) => item.name === to.name)?.name;

  if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta.keepAlive) {
    keepAliveComponents.push(currentComName);
  } else if (!to.meta.keepAlive || to.name === 'Redirect') {
    const index = keepAliveComponents.findIndex((name) => name === currentComName);
    if (index !== -1) {
      keepAliveComponents.splice(index, 1);
    }
  }

  asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
  Loading?.finish();
});

export const setupRouter = (app: App) => {
  app.use(router);
};

export default router;
