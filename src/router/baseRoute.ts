import { GlobalStoreEnum } from '@/enums/global';
import { AppRouteRecordRaw } from './types';

export const RedirectName = 'Redirect';

// export const ErrorPage = () => import( '@/views/exception/404.vue' );

export const Layout = () => import('@/layout/PageLayout.vue');

// export const ParentLayout = () => import( '@/layout/parentLayout.vue' );

export const baseRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: GlobalStoreEnum.HomeDefaultRoute,
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
          affix: true,
        },
        component: () => import('../views/admin/home.vue'),
      },
      {
        path: 'menu-setting',
        name: 'menuSetting',
        meta: {
          title: '菜单设置',
          keepAlive: true,
        },
        component: () => import('../views/admin/menu/index.vue'),
      },
      {
        path: 'role-setting',
        name: 'roleSetting',
        meta: {
          title: '角色设置',
          keepAlive: true,
        },
        component: () => import('../views/admin/roles/index.vue'),
      },
      {
        path: 'user-setting',
        name: 'userSetting',
        meta: {
          title: '用户设置',
          keepAlive: true,
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

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true,
      },
    },
  ],
};
