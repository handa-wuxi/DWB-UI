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
    async generateMenus(userId) {
      // 生成路由
      const res = await systemApi.getUserMenuList({ userId });
      if (res.code === 1) {
        this.menus = res.data.map((item) => ({
          id: item.id,
          title: item.memo,
          menucode: item.menucode,
          label: item.locale,
          key: item.link,
          openType: item.iscross,
          icon: renderIcon(item.icon),
        }));
      }
    },
  },
});
