import { defineStore } from 'pinia';
import projectSetting from '@/config/projectSetting';
import {
  MultiTabsSetting, CrumbsSetting, HeaderSetting, MenuSetting,
} from '#/config';
import { storage } from '@/utils/Storage';

const {
  navMode,
  menuSetting,
  pageAnimateType,
  isPageAnimate,
  isMobile,
  multiTabsSetting,
  crumbsSetting,
  headerSetting,
  navTheme,
} = projectSetting;

interface ProjectSettingState{
  navMode: string, // 导航模式
  navTheme: string, // 导航风格
  theme: boolean, // false => light  true => dark
  locale: string,
  collapsed: boolean,
  menuSetting: MenuSetting; // 多标签
  pageAnimateType: string, // 路由动画类型
  isPageAnimate: boolean, // 是否开启路由动画
  isMobile: boolean, // 是否处于移动端模式
  crumbsSetting: CrumbsSetting; // 面包屑
  multiTabsSetting: MultiTabsSetting; // 多标签
  headerSetting: HeaderSetting; // 顶部设置

}

const map = new Map();
map.set('zh-CN', '中文');
map.set('en-US', 'English');

export const ProjectSettingStore = defineStore({
  id: 'projectSetting',
  state: (): ProjectSettingState => ({
    navMode,
    theme: storage.get('theme') || false,
    locale: storage.get('locale') || 'zh-CN',
    collapsed: false,
    navTheme,
    pageAnimateType,
    isPageAnimate,
    isMobile,
    multiTabsSetting,
    crumbsSetting,
    headerSetting,
    menuSetting,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
    locales() {
      this.locale = storage.get('locale') || 'zh-CN';
      const modules = import.meta.globEager(`../../locales/langs/${storage.get('locale')}.ts`);
      const list = Object.keys(modules).map((item) => {
        const res = item.replace('../../locales/langs/', '').replace('.ts', '');

        return { label: map.get(res), key: res };
      });
      return list;
    },
  },
  actions: {
    async changeTheme(type = storage.get('theme')) {
      this.theme = type;
      document.documentElement.className = type ? 'dark' : 'light';
      storage.set('theme', type);
    },
    async changeCollapsed() {
      this.collapsed = !this.collapsed;
    },
    async setLocale(locale: string) {
      this.locale = locale;
      storage.set('locale', locale);
    },
    setIsMobile(value: boolean): void {
      this.isMobile = value;
    },
    getIsMobile(): boolean {
      return this.isMobile;
    },
  },
});
