import { defineStore } from 'pinia';
import { RendererElement, RendererNode, VNode } from 'vue';
import systemApi from '@/api/system';
import { renderIcon } from '@/utils/renderMenu';

export interface Menu {
  label: string;
  icon: () => VNode<RendererNode, RendererElement, { [ key: string ]: any; }>;
  key: string | number;
}

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
      const res = await systemApi.getMenuList({ userId: 2 });
      if (res.code === 1) {
        this.menus = res.data.map((item) => ({
          label: item.locale,
          key: item.link,
          icon: renderIcon(item.icon),
        }));
      }
    },
  },
});
