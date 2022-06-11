import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';
import { Recordable } from 'vite-plugin-mock';

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteCRecord extends Omit<RouteRecordRaw, 'children'>{
  name: string;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: RouteCRecord[];
  fullPath?: string;
  props?: Recordable;
}

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

export interface RouterRecord extends Omit<RouteCRecord, 'meta'> {
  name: string;
  path: string;
  meta?: Meta
  component?: Component | string;
  components?: Component;
  children?: RouteCRecord[];
  fullPath?: string;
  props?: Recordable;
}
