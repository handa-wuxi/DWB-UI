import { defineStore } from 'pinia';

export interface AsyncRouteState {
  keepAliveComponents: string[];
}

export const RouteStore = defineStore({
  id: 'asyncRoute',
  state: (): AsyncRouteState => ({
    keepAliveComponents: [],
  }),
  actions: {
    setKeepAliveComponents(compNames) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
  },
});
