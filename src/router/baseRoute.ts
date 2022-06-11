export const baseRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/admin/home',
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../layout/PageLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'adminHome',
        meta: {
          title: '主页',
        },
        component: () => import('../views/admin/home.vue'),
      },
      {
        path: 'menu-setting',
        name: 'menuSetting',
        meta: {
          title: '菜单设置',
        },
        component: () => import('../views/admin/menu/index.vue'),
      },
      {
        path: 'role-setting',
        name: 'roleSetting',
        meta: {
          title: '角色设置',
        },
        component: () => import('../views/admin/roles/index.vue'),
      },
      {
        path: 'user-setting',
        name: 'userSetting',
        meta: {
          title: '用户设置',
        },
        component: () => import('../views/admin/user/index.vue'),
      },
    ],
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('../views/base/authorization.vue'),
  },
];
