export const baseRoutes = [
  {
    path: '/',
    redirect: '/admin/menu-setting',
  },
  {
    path: '/admin',
    component: () => import('../layout/PageLayout.vue'),
    children: [
      {
        path: 'menu-setting',
        name: 'menuSetting',
        component: () => import('../views/admin/menu/index.vue'),
      },
    ],
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('../views/base/authorization.vue'),
  },
];
