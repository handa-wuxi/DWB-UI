import { defineStore } from 'pinia';
import systemApi from '@/api/system';
import { renderIcon } from '@/utils/renderMenu';
import { Menu } from '#/api';

export interface AsyncRouteState {
  keepAliveComponents: string[];
  menus: Menu[];
}

export const AsyncRouteStore = defineStore({
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
      const res = await systemApi.getUserMenuList({ userId: 2 });
      if (res.code === 1) {
        this.menus = res.data.map((item) => ({
          id: item.id,
          menucode: item.menucode,
          label: item.locale,
          key: item.link,
          icon: renderIcon(item.icon),
        }));
      }
    },
  },
});
