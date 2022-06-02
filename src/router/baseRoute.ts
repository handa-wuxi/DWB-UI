export const baseRoutes = [
  {
    path: '/',
    redirect: '/sys/index',
  },
  {
    path: '/sys',
    component: () => import('../layout/BaseLayout.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/base/index.vue'),
      },
    ],
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('../views/base/authorization.vue'),
  },
];
