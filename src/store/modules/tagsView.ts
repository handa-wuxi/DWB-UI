import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  meta: object;
  params: object;
  query: object;
};

interface TabsViewState {
  tabs: RouteItem[];
  currentTagIndex: number;
}

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login'];

// 保留固定路由
function retainAffixRoute(list: RouteItem[]) {
  return list.filter((item) => item?.meta?.affix ?? false);
}

export const TabsViewStore = defineStore({
  id: 'tabsView',
  state: (): TabsViewState => ({
    tabs: [],
    currentTagIndex: 0,
  }),
  getters: {
    getTabs(): RawObject[] {
      return this.tabs;
    },
  },
  actions: {
    initTabs(routes) {
      this.tabs = routes;
    },
    addTabs(tab: RouteItem) {
      if (whiteList.includes(tab.name)) {
        return false;
      }
      const isExist = this.tabs.some((item) => item.name === tab.name);
      if (!isExist) {
        this.tabs.push(tab);
      }
      return true;
    },
    closeLeftTabs(tab: RouteItem) {
      const index = this.tabs.findIndex((item) => item.name === tab.name);
      this.tabs.splice(0, index);
      this.currentTagIndex = 0;
    },
    closeRightTabs(tab: RouteItem) {
      const index = this.tabs.findIndex((item) => item.name === tab.name);
      this.tabs.splice(index + 1);
      this.currentTagIndex = index;
    },
    closeOtherTabs(tab: RouteItem) {
      this.tabs = this.tabs.filter((item) => item.name === tab.name);
    },
    closeCurrentTab(tab: RouteItem) {
      const index = this.tabs.findIndex((item) => item.name === tab.name);
      this.tabs.splice(index, 1);
    },
    closeAllTabs() {
      this.tabs = retainAffixRoute(this.tabs);
    },
  },
});
