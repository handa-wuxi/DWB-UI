import { defineStore } from 'pinia';
import globalApi from '@/api/global';

export interface AsyncRouteState {
  keepAliveComponents: string[];
  menus: any[];
}

export const RouteStore = defineStore({
  id: 'asyncRoute',
  state: (): AsyncRouteState => ({
    keepAliveComponents: [],
    menus: [],
  }),
  actions: {
    setKeepAliveComponents(compNames) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async generateMenus() {
      // 生成路由
      const res = await globalApi.getMenuList();
      console.log('res: ', res);
    },
  },
});
