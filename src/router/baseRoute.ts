import { GlobalStoreEnum } from '@/enums/global';
import { AppRouteRecordRaw } from './types';

export const RedirectName = 'global.redirect';

// export const ErrorPage = () => import( '@/views/exception/404.vue' );

export const Layout = () => import('@/layout/PageLayout.vue');

// export const ParentLayout = () => import( '@/layout/parentLayout.vue' );

export const baseRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'global.home',
    },
    redirect: GlobalStoreEnum.HomeDefaultRoute,
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      title: 'global.home',
    },
    redirect: GlobalStoreEnum.BaseHome,
    component: () => import('../layout/PageLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'AdminHome',
        meta: {
          title: 'global.home',
          affix: true,
          keepAlive: true,
        },
        component: () => import('../views/admin/home/index.vue'),
      },
      {
        path: 'menu-setting',
        name: 'MenuSetting',
        meta: {
          title: 'global.menuSetting',
          keepAlive: true,
        },
        component: () => import('../views/admin/menu/index.vue'),
      },
      {
        path: 'role-setting',
        name: 'RoleSetting',
        meta: {
          title: 'global.roleSetting',
          keepAlive: true,
        },
        component: () => import('../views/admin/roles/index.vue'),
      },
      {
        path: 'user-setting',
        name: 'UserSetting',
        meta: {
          title: 'global.userSetting',
          keepAlive: true,
        },
        component: () => import('../views/admin/user/index.vue'),
      },
      {
        path: 'system-log',
        name: 'SystemLog',
        meta: {
          title: 'global.systemLog',
          keepAlive: true,
        },
        component: () => import('../views/admin/system/index.vue'),
      },
    ],
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('../views/base/authorization.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'global.login',
    },
    component: () => import('../views/base/login.vue'),
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
