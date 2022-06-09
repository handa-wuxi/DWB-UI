import { defineStore } from 'pinia';
import globalApi from '@/api/global';
import { renderIcon } from '@/utils/renderMenu';
import { Menu } from '#/config';

export interface AsyncRouteState {
  keepAliveComponents: string[];
  menus: Menu[];
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
      if (res.status === 200) {
        this.menus = res.data.map((item) => ({
          label: item.label,
          key: item.key,
          icon: () => renderIcon(item.icon as string),
        }));
      }
    },
  },
});
