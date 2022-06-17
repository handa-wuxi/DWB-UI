import type { RouteRecordRaw, RouteMeta, RouteLocationNormalized } from 'vue-router';

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  meta: object;
  params: object;
  query: object;
};

export interface Meta {
  title?: string;
  permission?: string[]; // 权限
  affix?: boolean; // 是否固定在tab
  keepAlive?: boolean; // 是否缓存
  icon?: string; // 图标
  frameSrc?: string; // 弹窗页面
  externalLink?: string; // 外链
  hidden?: boolean; // 是否隐藏
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: RawObject;
  fullPath?: string;
}
export interface Menu {
  title: string;
  label: string;
  key: string;
  meta: RouteMeta;
  name: string;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: RawObject;
  fullPath?: string;
  icon?: RawObject;
  path: string;
  permissions?: string[];
  redirect?: string;
  sort?: number;
}
